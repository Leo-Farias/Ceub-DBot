const { MessageAttachment } = require('discord.js');

const sendEmbed = (msg, type, title, fields) => {
    let file_path = '';
    let hex_color = 0x000000;

    switch(type) {
        case 'QUIZZ':
            file_path = './src/assets/quizzIcon.png';
            hex_color = 0x4be08a;
            break;
        case 'TIME':
            file_path = './src/assets/time.png';
            hex_color = 0xffe351;
            break;
        case 'LOAD':
            file_path = './src/assets/load.png';
            hex_color = 0x33ffe3;
            break;
        case 'ERROR':
            file_path = './src/assets/error.png';
            hex_color = 0xc62d2d;
            break;
        case 'ALERT':
            file_path = './src/assets/alert.png';
            hex_color = 0xd9bc00;
            break;
        case 'CORRECT':
            file_path = './src/assets/correct.png';
            hex_color = 0x45d900;
            break;
        default: 
            file_path = './src/assets/error.png';
            hex_color = 0xad0000;
            break;
    }

    const file = new MessageAttachment(file_path);
    const msgEmbed = {
        color: hex_color,
        author: {
            name: title,
        icon_url: `attachment://${/\w+\.\w*/.exec(file_path)[0]}`,
        },
        fields: fields
    };
    
    msg.channel.send({ files: [file], embed: msgEmbed });
}


module.exports = { sendEmbed };