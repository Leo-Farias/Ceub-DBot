const fs = require('fs')
const path = require('path')
var shell = require('shelljs')

const runCode = (code, interpreter = 'python') => {
    const fileName = String(Math.random() * 100000000).slice(0, 8) + '.py'
    const filePath = path.resolve(__dirname, '..', 'tmp')
    const fileFullPath = filePath + '/' + fileName

    const encondedCode = "# -*- coding: utf-8 -*-\n" + code
    return new Promise((resolve, reject) => {
        fs.writeFile(fileFullPath, encondedCode, (err) => {
            if (err) throw err
            const command = `${interpreter} ${fileFullPath}`
            //console.log('COMMAND:', command)
            try {
                const commandReturn = shell.exec(command)
                
                if(commandReturn.stdout) resolve(commandReturn.stdout)
                else {
                    const fullCode = `\\\`\\\`\\\`\nprint("Hello World")\n\\\`\\\`\\\``
                    const lineCode = `\\\`print("Hello World")\\\``
                    const badFormat = `Codigo mal formatado. Use:\n${lineCode}\nou\n${fullCode}`
                    reject(badFormat)
                }
            } catch (err) {
                console.log(err)
            }
            fs.unlink(fileFullPath, (err) => {if (err) throw err})
        })
    })
    
    //output = shell.exec('python teste.py')
}

module.exports = runCode