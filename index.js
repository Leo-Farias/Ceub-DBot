require('dotenv').config()
// Instanciando o bot.
const Discord = require('discord.js');
const bot = new Discord.Client();

// Configurações base <.env>
const token = process.env.API_TOKEN
const PREFIX = process.env.PREFIX
const ENV = process.env.ENV

// Obtendo demais recursos do projeto.
const cm = require('./src/js/comandos.js');
const CommandController = require('./src/controllers/command.controller.js')
const commandParser = require('./src/utils/commandParser')

bot.on('ready', () => {
    console.log("=== BOT INICIADO ===");
    console.log("ENV:" ,ENV, "\nPREFIX:", PREFIX, "\n\n\n")
});


bot.on('message', msg => { // Evento dispara sempre que alguém manda uma mensagem.
    // Filtra mensagens de bot
    if (msg.author.bot) return
    // Filtra mensagem apenas para aqueles que começam com o prefixo correto
    if (msg.content.substring(0, PREFIX.length) !== PREFIX) return
    
    // Separação de argumentos para comandos com mais opções. $escolher 1 => args[0] escolher, args[1] => 1
    let args = msg.content.substring(PREFIX.length).split(" ");
        

    switch(true) {
        // COMANDOS PARA EXECUTAR:
        case 'ping': // Nome do comando;
            // Para interagir com o usuário utilizamos o objeto msg, que é gerado pelo evento. Este objeto 
            // Permite que a gente mande mensagens, pegue as informações do autor da mensagem, mandar uma mensagem
            // no canal em que o autor enviou o comando, entre outros.
            msg.channel.send("Pong");

            break;
        case 'somar': // EXEMPLO DE UM COMANDO COM VÁRIOS ARGUMENTOS
            // Eu geralmente chamo as resposta dos comandos de r(sigla_Do_Comando). rs => resposta somar.
            let rs = cm.somar(args[1], args[2]); // OBS: Args[n] são do tipo string. Então é sempre bom validar eles nos comandos.
            
            if(!rs.erro) {
                msg.channel.send(`Resultado: ${ rs.resultado }`);
                msg.channel.send(`Dobro do seu resultado: ${ 2 * rs.resultado }`);
            } 
            else 
                msg.channel.send(rs.erro);
            
            break;
        case /^\$code/.test(msg.content): CommandController.runCommand(msg)
            break;
        default:
            console.log("NO OPTION FOR: '" + msg.content + "'")
            break;
    }
});

// Inicializando o bot.
bot.login(token);