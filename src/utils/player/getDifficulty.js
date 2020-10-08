const DifficultyDAO = require('../../database/DAO/difficulty.dao')

function playerDifficulty(playerLevel){
    DifficultyDAO.getDifficulty()
    .then((results) => {
        const dificuldades = results
        var playerDiff = []
        for (let i = 0; i <= dificuldades.length - 1; i++){
            if((dificuldades[i].max >= playerLevel) && (dificuldades[i].min <= playerLevel)){
                if(dificuldades[i-2] !== undefined) playerDiff.push(dificuldades[i-2])
                if(dificuldades[i-1] !== undefined) playerDiff.push(dificuldades[i-1])
                playerDiff.push(dificuldades[i])
                if(dificuldades[i+1] !== undefined) playerDiff.push(dificuldades[i+1])
                if(dificuldades[i+2] !== undefined) playerDiff.push(dificuldades[i+2])

                return playerDiff
            }
        }
    })
}

module.exports = playerDifficulty