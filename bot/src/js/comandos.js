/**
 * Exibir informações do membro/usuário de forma estilizada com uma Discord.MessageEmbed().
 * @param {str} a primeiro número a ser somado.
 * @param {str} b segundo número a ser somado.
 * @return {Object} objeto que representa resultado da operação.
*/
const somar = (a, b) => {
    const response = { resultado: 0, erro: null };

    // Conferindo se valores são números.
    if (isNaN(a) || isNaN(b))
        return { ...response, erro: 'Um dos valores não é um número válido.' };
    else {
        a = Number(a);
        b = Number(b);
        return { ...response, resultado: a + b };
    }
}

module.exports = { somar };