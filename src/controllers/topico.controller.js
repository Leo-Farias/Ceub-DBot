const validarTopico = (livro, topico_para_validar) => {
    // OBTENDO TOPICOS VALIDOS PADRÃO.
    let topicosValidos = [];
    for (let topico in livro)
        topicosValidos.push(topico);

    // PODEMOS FAZER O REPLACE PARA ACEITAR VALORES ALÉM DAS CHAVES DO OBJETO LIVRO
    let topico = topico_para_validar.toLowerCase().replace(/variavel|variável+/g, 'var')
        .replace(/funcao|funçao|função+/g, 'func')
        .replace(/objeto+/g, 'obj');
    
    return topicosValidos.includes(topico);
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

module.exports = { validarTopico, obterTopicoInvalidoFromArray };