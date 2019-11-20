const mysql = require('mysql');
const fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    database: "auto",
    user: "admin",
    password: "admin"
});

const folder = 'migrates';
const tables = ['brand', 'modif'];
if (!fs.existsSync(folder)) fs.mkdirSync(folder);
dump();

function dump() {
    con.connect(async (err) => {
        const dump = {};
        if (err) throw err;
        console.log("Connected!");
        for (let table of tables) {
            dump[table] = await new Promise(resolve => con.query(`select * from ${table}`, function (err, result) {
                if (err) throw err;
                if (table === 'brand')
                    resolve(result.reduce((prev, obj) => ({...prev, [obj.id]: obj}), {}));
                else
                    resolve(result)
            }));
            console.log(table);
        }

        const models = await new Promise(resolve => con.query(`select * from model`, function (err, result) {
            resolve(result.reduce((prev, obj) => ({...prev, [obj.id]: obj}), {}));
        }));
        const gens = await new Promise(resolve => con.query(`select * from gen`, function (err, result) {
            resolve(result);
        }));
        const bodies = await new Promise(resolve => con.query(`select * from body`, function (err, result) {
            resolve(result);
        }));
        Object.keys(models).forEach(key => {
            const model_id = parseInt(key);
            models[key].gens = [];
            for (let gen of gens.filter(gen => gen.model_id === model_id)) {
                gen.bodies = [];
                for (let body of bodies.filter(body => body.gen_id === gen.id)) {
                    gen.bodies.push(body);
                }
                models[key].gens.push(gen);
            }
        });
        dump.models = models;

        const path = `${folder}/dump.json`;
        fs.writeFile(path, JSON.stringify(dump), (err) => {
            if (err) return console.error(err);
            return console.log(`${path} wrote`)
        })
    });
}

