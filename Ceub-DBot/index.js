require('dotenv').config()

// Importacoes
const fs = require('fs')
const path = require('path')
const { setNewPlayer } = require('./src/database/DAO/player.dao')

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

//




//const joinEvent = require('./src/events/join.event') 
bot.on('ready', () => {
    bot.user.setActivity('!ajuda').catch(error => console.log(error));
    bot.quizz = {}; 
    console.log("=== BOT INICIADO ===");
    console.log("ENV:" ,ENV, "\nPREFIX:", PREFIX, "\n\n\n");
});

const joinEvent = require('./src/events/join.event');
bot.on('guildMemberAdd', async member => {
    joinEvent.enviarDirect(bot, member);
});


bot.on('message', msg => { // Evento dispara sempre que alguém manda uma mensagem.
    
    // Filtra mensagens de bot
    if (msg.author.bot) return

    if ((/windows/i.test(msg.content.toLowerCase()))){
        sendEmbed(msg, 'ERROR', 'ERRO 417: EXPECTATION FAILED', [
            { name:'\u200B', value: `LINUX > WINDOWS` }
        ])
    }

    else if ((/aderbal|adebal/i.test(msg.content.toLowerCase()))){
        sendEmbed(msg, 'ALERT', 'CUIDADO', [
            { name:'\u200B', value: `**Não fala do google perto desse cara...**` }
        ])
    }

    else if ((/não sei|n sei|n sei o q fazer|Não sei o que fazer|n sei o que fazer|estou com dúvida|quais são os comandos|como usa os comandos/i.test(msg.content.toLowerCase()))){
        sendEmbed(msg, 'ALERT', 'Fique tranquilo vai dar tudo certo!', [
            { name:'\u200B', value: `**Busque mais informações sobre o assunto com o comando !ajuda**` }
        ])
    }

    else if ((/LeFiF/i.test(msg.content.toLowerCase()))){
        sendEmbed(msg, 'TIME', 'Essa é a história de vida do LeFiF', [
            { name:'\u200B', value: `**Nesse mundo uma empresa de tecnologia, chamada Elgoog, se tornou dona de cerca de 95% de todos os aparelhos tecnológicos e seus respectivos softwares, é praticamente impossível conhecer alguém que não possui um de seus produtos. Porém o que as pessoas comuns não sabem é que o verdadeiro plano da Elgoog é de controlar todas as pessoas às tornando escravas de seus produtos. Percebendo o plano maligno dessa empresa, o senhor A e sua equipe, os Tux, criaram uma inteligência artificial para recrutar e ensinar as pessoas à se defender da Elgoog, o Learn to Fight for Freedom (LeFiF).**` }
        ])
    }

    //Cria jogador caso ele nao tenha sido criado
    setNewPlayer(msg)

    // Filtra mensagem apenas para aqueles que começam com o prefixo correto
    if (msg.content.substring(0, PREFIX.length) !== PREFIX) return
    
    // Separação de argumentos para comandos com mais opções. $escolher 1 => args[0] escolher, args[1] => 1
    let args = msg.content.substring(PREFIX.length).split(" ");    

    
    // Tratamento de comandos
    let command = bot.commands.get(args[0].toLowerCase())
    if(!command){
        sendEmbed(msg, 'ALERT', 'ERRO 404: COMANDO NÃO ENCONTRADO.', [
            { name:'\u200B', value: `Não foi possível encontrar o comando \`${args[0]}\` na base de dados.\nDigite **${PREFIX}ajuda** para obter uma lista de comandos.` }
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