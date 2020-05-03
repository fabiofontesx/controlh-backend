module.exports = { 
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQl_USER,
    password: process.env.MYSQl_PASSWORD,
    database: process.env.MYSQl_DATABASE
}