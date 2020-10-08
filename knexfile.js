require('dotenv').config()
const path = require('path')

module.exports = {
    development: {
        client: 'mysql2',
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
        },
        pool: { min: 0, max: 5 }
    },
    developmentPg: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'uniceub',
            password: process.env.DB_PASSWORD || 'uniceub',
            database: process.env.DB_NAME || 'discord_dev',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${path.resolve(__dirname, 'src', 'database', 'migrations')}`
        },
        seeds: {
            directory: `${path.resolve(__dirname, 'src', 'database', 'seeds')}`
        },
        pool: { min: 0, max: 5 }
    }
}

/* CREATE MIGRATION
npx knex migrate:make create_table_name
*/