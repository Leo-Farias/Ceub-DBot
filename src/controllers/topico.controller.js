const validarTopico = (livro, topico_usuario) => {
    // OBTENDO TOPICOS VALIDOS PADRÃO.
    let topicosValidos = [];
    for (let topico in livro)
        topicosValidos.push(topico);
    
    return topicosValidos.includes(topico_usuario);
}

const obterSmartTopico = (topico) => {
    // PODEMOS FAZER O REPLACE PARA ACEITAR VALORES ALÉM DAS CHAVES DO OBJETO LIVRO
    return topico.toLowerCase().replace(/variavel|variável+/g, 'var')
        .replace(/funcao|funçao|função+/g, 'func')
        .replace(/intro|introduc|introdução+/g, 'introducao')
        .replace(/dado|dados+/g, 'dados');
}

const obterTopicoInvalidoFromArray = (livro, topicos) => {
    let index_topico_invalido = null;

    topicos.some( (topico, index) => {
        if(!validarTopico(livro, topico)) {
            index_topico_invalido = index;
            return true;
        } 
        else return false;    
    });

    return index_topico_invalido;
}

module.exports = { validarTopico, obterTopicoInvalidoFromArray, obterSmartTopico };