const db = require('./db');

[
    'brand (id INT PRIMARY KEY AUTO_INCREMENT, name TEXT, label TEXT)',
    'model (id INT PRIMARY KEY AUTO_INCREMENT, name TEXT, label TEXT, brand_id INT)',
    'gen (id INT PRIMARY KEY AUTO_INCREMENT, name TEXT, label TEXT, years TEXT, model_id INT)',
    'body (id INT PRIMARY KEY AUTO_INCREMENT, name TEXT, images TEXT, label TEXT, descr TEXT, gen_id INT)',
    'modif (id INT PRIMARY KEY AUTO_INCREMENT, engine TEXT, gearbox TEXT, drive TEXT, consum TEXT, accel TEXT, body_id INT)',
].forEach(queryTable => {
    db.query('CREATE TABLE IF NOT EXISTS ' + queryTable, () => console.log('executed ' + queryTable));
});