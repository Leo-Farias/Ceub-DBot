codeExtract = (code) => {
    //const regex = /```((.|\n)*)```/

    const codeLength = code.length
    var codeFormated = code.slice(3, codeLength)
    codeFormated = codeFormated.slice(0, codeLength - 6)
    return codeFormated
}


module.exports = codeExtract