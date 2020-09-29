const fs = require('fs')
const path = require('path')
var shell = require('shelljs')

const runCode = (code, interpreter = 'python') => {
    const fileName = String(Math.random() * 100000000).slice(0, 8) + '.py'
    const filePath = path.resolve(__dirname, '..', 'tmp')
    const fileFullPath = filePath + '/' + fileName


    return new Promise((resolve, reject) => {
        fs.writeFile(fileFullPath, code, (err) => {
            if (err) throw err
            const command = `${interpreter} ${fileFullPath}`
            console.log('COMMAND:', command)
            const commandReturn = shell.exec(command)
            console.log('SAIDA SHELL:', commandReturn.stdout || commandReturn.stderr)
            fs.unlink(fileFullPath, (err) => {if (err) throw err})
            resolve(commandReturn.stdout || commandReturn.stderr)
        })
    })
    
    //output = shell.exec('python teste.py')
}

module.exports = runCode