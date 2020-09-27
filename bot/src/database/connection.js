require('dotenv').config()

const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile[process.env.ENV || 'development'])