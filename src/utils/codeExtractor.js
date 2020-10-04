codeExtract = (msg) => {
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
        console.log("NO MATCH FOR CODE!!")
        const badFormat = `Codigo mal formatado. Use:
        \`print("Hello World")\`
        ou
        \`\`\`
        print("Hello World")
        \`\`\``
        return badFormat
    }
    
    //console.log("FORMATED CODE:", codeFormated)
    return codeFormated
}


module.exports = codeExtract