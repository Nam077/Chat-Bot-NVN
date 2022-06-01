const { Sequelize } = require('@sequelize/core');
require('dotenv').config();
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.NAME_DATABASE, process.env.USER_DATABASE, process.env.PASS_DATABASE, {
    host: process.env.HOST_DATABASE,
    // one of our supported dialects:
    // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
    dialect: 'mysql',
    logging: false,
});
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kêt nối thành công với Database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
module.exports = connectDB;
