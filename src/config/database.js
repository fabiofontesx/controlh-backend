require('dotenv').config();
module.exports = {

    development: {
        dialect: 'mysql',
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQl_USER,
        password: process.env.MYSQl_PASSWORD,
        database: process.env.MYSQl_DATABASE
    },

    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql"
    },

    production: {
        dialect: 'mysql',
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQl_USER,
        password: process.env.MYSQl_PASSWORD,
        database: process.env.MYSQl_DATABASE
    }

}