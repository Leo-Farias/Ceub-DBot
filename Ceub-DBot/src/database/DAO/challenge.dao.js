const knex = require('../connection')
const { getDifficulty } = require('./difficulty.dao')
const { getPlayerInfo } = require('./player.dao')
 
async function getDifficultyForPlayer(msg){
    var difficultyArray = await getDifficulty()
        .then(result => {
            return result
        })
    var playerInfo = await getPlayerInfo(msg)
    
    return {
        playerInfo,
        difficulties: difficultyArray
    }
}
//const euzinho = { author: { id: '242443950047100928' } }
//getDifficultyForPlayer(euzinho)
module.exports = {
    getDifficultyForPlayer
}