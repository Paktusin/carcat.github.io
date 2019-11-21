const mysql = require('mysql');
const fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    database: "auto",
    user: "admin",
    password: "admin"
});

const folder = 'migrates';
const tables = ['body', 'brand', 'gen', 'model', 'modif'];
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
                resolve(result.reduce((prev, obj) => ({...prev, [obj.id]: obj}), {}));
            }));
            console.log(table);
        }

        const path = `${folder}/dump.json`;
        fs.writeFile(path, JSON.stringify(dump), (err) => {
            if (err) return console.error(err);
            return console.log(`${path} wrote`)
        })
    });
}

