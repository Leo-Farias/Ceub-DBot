const dificuldades = [
    { name: 'easy_1', min: 1, max: 15 },
    { name: 'easy_2', min: 10, max: 25 },
    { name: 'easy_3', min: 15, max: 35 },
    { name: 'medium_1', min: 20, max: 45 },
    { name: 'medium_2', min: 30, max: 65 },
    { name: 'medium_3', min: 40, max: 70 }, 
    { name: 'hard_1', min: 50, max: 85 },
    { name: 'hard_2', min: 60, max: 95 },
    { name: 'hard_3', min: 70, max: 100 },
];

const obterDificuldadePorNivel = (nivel_jogador) => {
    let dificuldadeValida = [];
    dificuldades.forEach(dificuldade => nivel_jogador >= dificuldade.min && nivel_jogador <= dificuldade.max 
        ? dificuldadeValida.push(dificuldade.name) 
        : null
    );
    return dificuldadeValida;
}

module.exports = { obterDificuldadePorNivel };
  