/**
 * @name: index
 * @author: LIULIU
 * @date: 2020-08-03 15:38
 * @description：index
 * @update: 2020-08-03 15:38
 */
const Sequelize = require('sequelize');
const config = require(__dirname + '/../database/config');
const path = require('path');
const basename = path.basename(__filename);
const fs = require('fs');
const db = {}

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        }
    }
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    console.log(modelName,"------")
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
module.exports = db;
