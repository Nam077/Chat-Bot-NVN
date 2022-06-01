require('dotenv').config();
module.exports = {
    development: {
        username: process.env.USER_DATABASE,
        password: process.env.PASS_DATABASE,
        database: process.env.NAME_DATABASE,
        host: process.env.HOST_DATABASE,
        dialect: 'mysql',
        logging: false,
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.USER_DATABASE,
        password: process.env.PASS_DATABASE,
        database: process.env.NAME_DATABASE,
        host: process.env.HOST_DATABASE,
        dialect: 'mysql',
        logging: false,
    },
};
