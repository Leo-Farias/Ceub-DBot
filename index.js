require('dotenv').config()
const fs = require('fs')
// Instanciando o bot.
const Discord = require('discord.js');
const bot = new Discord.Client();

// Configurações base <.env>
const token = process.env.API_TOKEN
const PREFIX = process.env.PREFIX
const ENV = process.env.ENV

// Obtendo demais recursos do projeto.
const { genLetterAsEmoji } = require('./src/utils/emoji-letters.js');
const { sendEmbed } = require('./src/utils/default-embeder');
const QuizzController = require('./src/controllers/quizz.controller.js');
const LivroController = require('./src/controllers/livro.controller.js');
const TopicoController = require('./src/controllers/topico.controller.js');
const DificuldadeController = require('./src/controllers/dificuldade.controller.js');
const livro = require('./src/assets/livro.json');
const { validarTopico } = require('./src/controllers/topico.controller.js');
bot.quizz = {};

//const joinEvent = require('./src/events/join.event') 
bot.on('ready', () => {
    console.log("=== BOT INICIADO ===");
    console.log("ENV:" ,ENV, "\nPREFIX:", PREFIX, "\n\n\n")
})


bot.on('message', msg => { // Evento dispara sempre que alguém manda uma mensagem.
    if ((!msg.author.bot) && (/windows|Windows|WINDOWS/.test(msg.content))) msg.channel.send(`Linux > Windows`)

    // Filtra mensagens de bot
    if (msg.author.bot) return
    // Filtra mensagem apenas para aqueles que começam com o prefixo correto
    if (msg.content.substring(0, PREFIX.length) !== PREFIX) return
    
    // Separação de argumentos para comandos com mais opções. $escolher 1 => args[0] escolher, args[1] => 1
    let args = msg.content.substring(PREFIX.length).split(" ");    
    try{
        bot.commands.get(args[0]).execute(msg, bot);
    } catch(err) {
        console.log(err);
        sendEmbed(msg, 'ALERT', 'ERRO 404: COMANDO NÃO ENCONTRADO.', [
            { name:'\u200B', value: `Não foi possível encontrar o comando \`${args[0]}\` na base de dados.` }
        ])
        console.log("NO OPTION FOR: '" + msg.content + "'");

    }
    
    
});

bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    console.log("Importing file:", file)
    const command = require(`./src/commands/${file}`)
    bot.commands.set(command.name, command)
}




// Inicializando o bot.
bot.login(token);