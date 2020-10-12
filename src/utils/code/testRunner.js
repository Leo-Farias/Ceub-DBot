const fs = require('fs')
var shell = require('shelljs')

const runCode = (code, interpreter = 'python') => {
    const testers = {
        python: 'pytest'
    }

    const fileName = String(Math.random() * 100000000).slice(0, 8) + '.py'
    const fileFullPath = process.env.TMP_DIR  + '/' + fileName

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
                    //fileRegexMatch = commandReturn.stderr.match(/File "(\/[a-z]*|[0-9]*)*.py", /)
                    //console.log(fileRegexMatch)
                    reject(commandReturn.stderr)
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