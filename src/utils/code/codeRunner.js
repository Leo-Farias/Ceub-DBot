const fs = require('fs')
var shell = require('shelljs')
const { Worker, isMainThread, parentPort } = require('worker_threads')



if(!isMainThread){
    parentPort.once('message', async (message) => {
        console.log("WORKER (RECEIVING):", message)
        const [ code, interpreter ] = message
        const fileName = String(Math.round(Math.random() * 100000000)) + '.py'
        const fileFullPath = process.env.TMP_DIR  + '/' + fileName

        const encondedCode = "# -*- coding: utf-8 -*-\n" + code
        
        fs.writeFile(fileFullPath, encondedCode, (err) => {
            if (err) throw err
            const command = `${interpreter} ${fileFullPath}`
            console.log('COMMAND:', command)

            var result
            try {
                const commandReturn = shell.exec(command)
                
                if(commandReturn.stdout) result = commandReturn.stdout
                else {
                    result = commandReturn.stderr
                }
            } catch (err) {
                console.log(err)
                result = "500: Server Error"
            }
            console.log("WORKER (SENDING)")
            try{
                parentPort.postMessage(result)
            } catch (err) {
                console.log(err)
            }
            fs.unlink(fileFullPath, (err) => {if (err) throw err})
        })
    })
}


const runCode = (code, interpreter = 'python') => {
    const worker = new Worker(__filename)
    const resultPromise = new Promise((resolve, reject) => {
        worker.once('message', (message) => {
            console.log("MASTER (RECEIVED):", message)
            resolve(message)
        })
    })
    console.log("MASTER (SENDING)")
    worker.postMessage([ code, interpreter ])
    return resultPromise
}


module.exports = runCode