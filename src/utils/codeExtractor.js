codeExtract = (code) => {
    const regexFullCode = /```((.|\n)*)```/
    const regexHelloWorld = /`(.*)`/
    
    

    if(code.match(regexFullCode)){
        console.log("MATCH (```):", code.match(regexFullCode))
        const codeLength = code.length
        var codeFormated = code.slice(3, codeLength)
        codeFormated = codeFormated.slice(0, codeLength - 6)
    }
    else if(code.match(regexHelloWorld)) {
        console.log("MATCH (`):", code.match(regexHelloWorld))
        return code.match(regexHelloWorld)[1]
    } else {
        console.log("NO MATCH FOR CODE!!")
    }
    
    //console.log("FORMATED CODE:", codeFormated)
    return codeFormated
}


module.exports = codeExtract