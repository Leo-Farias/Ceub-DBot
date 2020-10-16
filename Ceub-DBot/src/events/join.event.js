const enviarDirect = (bot, member) => {
    let embedDirect = {
        color: 0x0f00ff,
        author: {
            name: 'Boas Vindas!'
        },
        fields: [{ name: '``MENSAGEM DE LeFiF PARA VOCÊ``', value: '**Você acaba de entrar em um servidor que possui o LeFiF, o LeFiF é um bot para discord que foi criado para ajuda-ló em seus estudos de programação além disso ele luta contra os interesses da organização do mal Elgoog, para isso o LeFiF conta com a ajuda dos seus grandes amigos os softwares livres.**' },
        {name: '``Comandos``', value: '**Abaixo segue alguns comnados muito importantes que irão ajuda-ló muito a utilizar o bot**'},
        {name: '``!ajuda``', value:'**Com esse comando você terá acesso ao manual de uso do LeFiF, você pode encontrar os comandos que o bot possui por meio do !ajuda**'},
        {name: '``!historia``', value:'**Com esse comando você terá um pouco da história do LeFiF**'},
        {name: '``!code run``', value:'**Com esse comando você pode executar códigos em python dentro do chat do discord basta digitar !code run e em seguida o seu código**'},
        {name: '``!quizz``', value:'**O Comando !quizz inicia um quizz com perguntas de múltipla escolha sobre programação**'},
        {name: '``!livro``', value:'**Esse comando te infoma a lista dos tópicos que esão disponíveis e mostra o quanto você já leu de cada um**'},
        {name: '``!ler``', value:'**Para usar você esse comando você precisa digitar o !ler e no final incluir o tópico que você deseja ler, por exemplo, caso você queira ler sobre variáveis basta digitar o comando !ler var**'}
        ],
       
        timestamp: new Date(),
        footer: {
            text: 'Seja Muito Bem-Vindo Jovem Aprendiz',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
        },
        
    };
    bot.users.cache.get(member.user.id).send({ embed: embedDirect });
}

module.exports = {
    enviarDirect
};