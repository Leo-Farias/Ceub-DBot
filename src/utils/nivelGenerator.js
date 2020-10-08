function nivelGenerator(){
    levelXpList = []
    var xp = [140, 230]
    var xpDesafio = 90
    var desafioPorNivel
        for(let i = 1; i <= 135; i++){
            desafioPorNivel = Math.round((xp[1] - xp[0]) / xpDesafio)
            console.log(`LVL: ${i}, XP: ${xp[0]}/${xp[1]}, D/N:${desafioPorNivel}, XP_DESAFIO: ${xpDesafio}`)
            levelXpList.push({nivel: i, nivel_xp: xp[1] - xp[0], xp_desafio: xpDesafio})
            xp[0] = xp[1]
            xp[1] = Math.round(xp[1] * 1.050 + 90)
            xpDesafio = Math.round(xpDesafio * 1.02)
            }
    return levelXpList
}
nivelGenerator()
//console.log(nivelGenerator())
module.exports = nivelGenerator 