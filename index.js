require('dotenv').config()
const fs = require('fs')
const path = require('path')
// Instanciando o bot.
const Discord = require('discord.js');
const bot = new Discord.Client();

// Configurações base <.env>
const token = process.env.API_TOKEN
const PREFIX = process.env.PREFIX
const ENV = process.env.ENV
process.env.TMP_DIR = path.resolve(__dirname, 'src', 'tmp')
process.env.CHALLENGES_DIR = path.resolve(__dirname, 'src', 'challenges')

// Obtendo demais recursos do projeto.
const { genLetterAsEmoji } = require('./src/utils/emoji-letters.js');
const { sendEmbed } = require('./src/utils/default-embeder');

//const joinEvent = require('./src/events/join.event') 
bot.on('ready', () => {
    console.log("=== BOT INICIADO ===");
    console.log("ENV:" ,ENV, "\nPREFIX:", PREFIX, "\n\n\n")
})


bot.on('message', msg => { // Evento dispara sempre que alguém manda uma mensagem.
    if ((!msg.author.bot) && (/windows/i.test(msg.content))){
        sendEmbed(msg, 'ERROR', 'ERRO 417: EXPECTATION FAILED', [
            { name:'\u200B', value: `LINUX > WINDOWS` }
        ])
    }

    // Filtra mensagens de bot
    if (msg.author.bot) return
    // Filtra mensagem apenas para aqueles que começam com o prefixo correto
    if (msg.content.substring(0, PREFIX.length) !== PREFIX) return
    
    // Separação de argumentos para comandos com mais opções. $escolher 1 => args[0] escolher, args[1] => 1
    let args = msg.content.substring(PREFIX.length).split(" ");    
    
    // Tratamento de comandos
    let command = bot.commands.get(args[0])
    if(!command){
        sendEmbed(msg, 'ALERT', 'ERRO 404: COMANDO NÃO ENCONTRADO.', [
            { name:'\u200B', value: `Não foi possível encontrar o comando \`${args[0]}\` na base de dados.` }
        ])
        console.log("NO OPTION FOR: '" + msg.content + "'");
        return
    }
    return command.execute(msg, bot);
});


bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.command.js'));
for (const file of commandFiles) {
    console.log("Importing file:", file)
    const command = require(`./src/commands/${file}`)
    bot.commands.set(command.name, command)
}




// Inicializando o bot.
bot.login(token);