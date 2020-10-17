const DifficultyDAO = require('../../database/DAO/difficulty.dao')

async function playerDifficulty(playerLevel){
    const difficulty = await DifficultyDAO.getDifficulty()
        var playerDiff = []
        for (let i = 0; i <= difficulty.length - 1; i++){
            if((difficulty[i].max >= playerLevel) && (difficulty[i].min <= playerLevel)){
                if(difficulty[i-2] !== undefined) playerDiff.push(difficulty[i-2])
                if(difficulty[i-1] !== undefined) playerDiff.push(difficulty[i-1])
                playerDiff.push(difficulty[i])
                if(difficulty[i+1] !== undefined) playerDiff.push(difficulty[i+1])
                if(difficulty[i+2] !== undefined) playerDiff.push(difficulty[i+2])

                return playerDiff
            }
        }
}
/* USAGE EXAMPLE

*/
//playerDifficulty(5).then((result) => console.log(result))
module.exports = playerDifficulty