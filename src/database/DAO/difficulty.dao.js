const knex = require('../connection')
 
function getDifficulty(){    
    return knex.select('*').from('tb_dificuldades').limit(9)
        .then((results) => {
            knex.destroy()
            return results
        })
}

module.exports = {
    getDifficulty
}