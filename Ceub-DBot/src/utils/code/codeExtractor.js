const { sendEmbed } = require('../default-embeder')

const codeExtract = (msg) => {
    const code = msg.content
    console.log("CODE:", code)
    const regexFullCode = /```((.|\n)*)```/
    const regexLineCode = /`(.*)`/
    

    if(code.match(regexFullCode)){
        console.log("MATCH (```)")
        return code.match(regexFullCode)[1]
    }
    else if(code.match(regexLineCode)) {
        console.log("MATCH (`)")
        return code.match(regexLineCode)[1]
    } else {
        console.log("BAD CODE FORMAT EXCEPTION")
        const badFormat = `Codigo mal formatado.
        Use:
        \n
        code run \\\`print("Hello World")\\\`
        \n
        code run
        \\\`\\\`\\\`
        print("Hello World")
        \\\`\\\`\\\``
        sendEmbed(msg, 'ALERT', 'ERROR 400: Bad Code Format',
        { name: '\u200B', value: badFormat})
        return
    }
}


module.exports = codeExtract