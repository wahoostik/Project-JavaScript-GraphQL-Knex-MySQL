const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host : process.env.HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    }
});

module.exports = { db };