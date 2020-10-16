const enviarDirect = (bot, member) => {
    let embedDirect = {
        color: 0x0f00ff,
        author: {
            name: 'Boas Vindas!'
        },
        fields: [{ name: 'PADRÃO', value: 'Esta é uma mensagem padrão.' }]
    };
    bot.users.cache.get(member.user.id).send({ embed: embedDirect });
}

module.exports = {
    enviarDirect
};