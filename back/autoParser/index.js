const request = require('request');
const cheerio = require('cheerio');
const config = require('./config');
const Brand = require('./model/Brand');
const Model = require('./model/Model');
const Gen = require('./model/Gen');
const Mod = require('./model/Mod');
const Body = require('./model/Body');
const Op = require('sequelize').Op;
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const imgur = require('imgur');

const url = 'https://auto.ru/catalog/cars';

const type = 'all';

imgur.setAPIUrl('https://api.imgur.com/3/');
imgur.setClientId(config.imgUr.key);
imgur.setCredentials(config.imgUr.user, config.imgUr.password, config.imgUr.key);

const parseBrands = () => new Promise((resolve, reject) => {
    request(url + '/', {headers: {cookie: config.cookie}}, (err, res, body) => {
        if (!err) {
            const $ = cheerio.load(body);
            const brands = $(`.search-form-v2-list_type_${type} .search-form-v2-item`).toArray().map(el => {
                return Brand.build({
                    name: $(el).text(),
                    label: $(el).attr('href').split('/').splice(-2, 1).toString()
                });
            });
            console.log(`parsed ${brands.length} brands`);
            resolve(brands);
        } else {
            reject('error');
        }
    });
});
const parseModels = (brand) => new Promise((resolve, reject) => {
    request(url + `/${brand.label}`, {headers: {cookie: config.cookie}}, (err, res, body) => {
        if (!err) {
            const $ = cheerio.load(body);
            let query = $(`.search-form-v2-list_type_all .search-form-v2-item`).toArray();
            if (query.length === 0) query = $(`.search-form-v2-list_type_popular .search-form-v2-item`).toArray();
            const models = query.map(el => {
                return Model.build({
                    name: $(el).text(),
                    label: $(el).attr('href').split('/').splice(-2, 1).toString(),
                    brand: brand
                });
            });
            console.log(`parsed ${models.length} models for brand ${brand.name}`);
            resolve(models);
        } else {
            reject('error');
        }
    });
});
const parseGens = (model) => new Promise((resolve, reject) => {
    request(url + `/${model.brand.label}/${model.label}/`, {headers: {cookie: config.cookie}}, (err, res, body) => {
        if (!err) {
            const $ = cheerio.load(body);
            let query = $(`.catalog-all-text-list dt`).toArray();
            const models = query.map(el => {
                return Gen.build({
                    name: $(el).find('.catalog-all-text-list__subtext').text(),
                    years: $(el).contents().first().text(),
                    label: $(el).next().find('a').attr('href').split('/').splice(-3, 1).toString(),
                    model: model
                });
            });
            console.log(`parsed ${models.length} gens for model ${model.name}`);
            resolve(models);
        } else {
            reject('error');
        }
    });
});
const parseBody = (gen) => new Promise((resolve, reject) => {
    request(url + `/${gen.model.brand.label}/${gen.model.label}/${gen.label}/`, {headers: {cookie: config.cookie}}, (err, res, body) => {
        if (!err) {
            let $ = cheerio.load(body);
            Promise.all(
                $('.catalog-all-text-list a.link.mosaic__title').toArray().map(link => new Promise(resolve => {
                    const bodyLink = $(link).attr('href');
                    const bodyName = $(link).text();
                    request(`https://auto.ru${bodyLink}`, {headers: {cookie: config.cookie}}, (err, res, body) => {
                        let $ = cheerio.load(body);
                        let bodyData = {
                            name: bodyName,
                            label: bodyLink.split('/').splice(-2, 1).toString(),
                            gen_id: gen.id,
                            descr: $('.catalog-generation__about').text(),
                            mods: []
                        };
                        let tmp_Engine;
                        for (let rowEl of $('.catalog-table__row.catalog-table__row_highlight').toArray()) {
                            if ($(rowEl).find('.catalog-table__cell_alias_engine').text().length > 0) {
                                tmp_Engine = $(rowEl).find('.catalog-table__cell_alias_engine').text()
                            }
                            bodyData.mods.push({
                                engine: tmp_Engine,
                                gearbox: $(rowEl).find('.catalog-table__cell_alias_gearbox a').text(),
                                drive: $(rowEl).find('.catalog-table__cell_alias_drive').text(),
                                consum: $(rowEl).find('.catalog-table__cell_alias_fuel_consumption').text(),
                                accel: $(rowEl).find('.catalog-table__cell_alias_acceleration').text()
                            });
                        }
                        resolve(bodyData);
                    });
                }))
            )
                .then(bodies => {
                    console.log(`parsed ${bodies.length} bodies for gen ${gen.name}`);
                    resolve(bodies)
                });
        } else {
            reject('error');
        }
    });
});
const parseImage = (bodyEntity) => new Promise((resolve, reject) => {
    request(url + `/${bodyEntity.gen.model.brand.label}/${bodyEntity.gen.model.label}/${bodyEntity.gen.label}/${bodyEntity.label}`, {headers: {cookie: config.cookie}}, (err, res, body) => {
        let $ = cheerio.load(body);
        const imageSrc = $('.photo-gallery__photo').toArray().map(el => $(el).css('background-image')
            .replace('url(', '')
            .replace(')', '')
            .replace('"', '')
            .replace('//auto.ru/', 'http://auto.ru/')
        )[0];
        saveImageToGur(imageSrc).then(url => {
            bodyEntity.images = url;
            bodyEntity.save().then(() => {
                setTimeout(resolve.bind(null, true), 5000)
            })
        }).catch((minutes) => reject(minutes))
    });
});
const saveImageToGur = (uri) => new Promise((resolve, reject) => {
    const folder = 'img/';
    const filename = uuidv1() + '.jpg';
    request.head(uri, {headers: {cookie: config.cookie}}, (err, res, body) => {
        request(uri, {headers: {cookie: config.cookie}}).pipe(fs.createWriteStream(folder + filename)).on('close', () => {
            console.log('saved file ' + filename);
            imgur.uploadFile(folder + filename, config.imgUr.album).then(json => {
                console.log(json.data.link);
                fs.unlink(folder + filename);
                resolve(json.data.link);
            }).catch(err => {
                let message = '';
                if (err.message.message) message = err.message.message;
                console.log(message);
                reject(parseInt(message.substr(message.indexOf('wait'), message.length).split(' ')[1]));
            })
        });
    });
});

async function parse(params) {
    console.log('init parse with params ' + params);
    let restart = 0;
    if (params.indexOf('brand') !== -1) {
        let brands = await parseBrands();
        for (let brand of brands) {
            await Brand.findOrCreate({where: {label: brand.label}, defaults: brand.dataValues});
        }
    }
    if (params.indexOf('model') !== -1) {
        let brands = await Brand.findAll({where: {name: {[Op.like]: `%${params[params.indexOf('model') + 1] || ''}%`}}});
        for (let brand of brands) {
            let models = await parseModels(brand);
            for (let model of models) {
                await Model.findOrCreate({
                    where: {label: model.label, brand_id: brand.id},
                    defaults: model.dataValues,
                    include: ['brand']
                })
            }
        }
    }
    if (params.indexOf('gen') !== -1) {
        let models = await Model.findAll({
            where: {name: {[Op.like]: `%${params[params.indexOf('gen') + 1] || ''}%`}},
            include: ['brand']
        });
        for (let model of models) {
            let gens = await parseGens(model);
            for (let gen of gens) {
                await Gen.findOrCreate({
                    where: {label: gen.label, model_id: model.id},
                    defaults: gen.dataValues,
                    include: ['model']
                })
            }
        }
    }
    if (params.indexOf('body') !== -1) {
        let gens = await Gen.findAll({
            where: params[params.indexOf('body') + 1] ? {label: params[params.indexOf('body') + 1]} : {},
            include: [{model: Model, as: 'model', include: ['brand']}]
        });
        for (let gen of gens) {
            let bodies = await parseBody(gen);
            for (let bodyData of bodies) {
                let found = await Body.findAll({where: {label: bodyData.label, gen_id: gen.id}});
                if (found && found.length === 0) await Body.create(bodyData, {
                    include: ['gen', 'mods']
                });
            }
        }
    }
    try {
        if (params.indexOf('img') !== -1) {
            let bodies = await Body.findAll({
                where: params[params.indexOf('img') + 1] ? {label: params[params.indexOf('img') + 1]} : {},
                include: [{model: Gen, as: 'gen', include: {model: Model, as: 'model', include: ['brand']}}]
            });
            for (let body of bodies) {
                if (!body.images) {
                    await parseImage(body)
                }
            }
        }
    } catch (minutes) {
        if (minutes && Number.isInteger(minutes)) {
            console.log(`restart after ${minutes} minutes`);
            restart = minutes * 60000;
        } else {
            process.exit();
        }
    }
    if (restart > 0) setTimeout(()=>parse(params), restart);
    else process.exit();
}

parse(process.argv.splice(2));
