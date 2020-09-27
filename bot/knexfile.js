require('dotenv').config()
const path = require('path')
console.log(process.env.DB_HOST)

module.exports = {
    development: {
        client: 'mysql',
        version: '5.7',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${path.resolve(__dirname, 'src', 'database', 'migrations')}`
        }
    }
}

/* CREATE MIGRATION
npx knex migrate:make create_table_bot_config
*/