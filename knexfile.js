require('dotenv').config()
const path = require('path')

module.exports = {
    development: {
        client: 'mysql',
        version: '5.7',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'uniceub',
            database: process.env.DB_NAME || 'discord_dev',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${path.resolve(__dirname, 'src', 'database', 'migrations')}`
        },
        seeds: {
            directory: `${path.resolve(__dirname, 'src', 'database', 'seeds')}`
        }
    }
}

/* CREATE MIGRATION
npx knex migrate:make create_table_bot_config
*/