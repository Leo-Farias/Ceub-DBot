const knex = require('../connection')
 
async function getDifficulty(){    
    return await knex.select('*').from('tb_dificuldades').limit(9)
        .then((results) => {
            return results
        })
}
module.exports = {
    getDifficulty
}