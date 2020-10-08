require('dotenv').config()

const knexfile = require('../../knexfile')
const knex = require('knex')
const mysql = knex((knexfile[process.env.ENV || 'development']))

module.exports = mysql