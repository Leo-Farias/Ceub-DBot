const fs = require('fs')
const path = require('path')
var shell = require('shelljs')
const { Worker, isMainThread, parentPort } = require('worker_threads')


const interpreterConfig = {
    pytest: { configFile: 'pytest_runner.py', command: 'pytest -p no:cacheprovider' }
}


if(!isMainThread){
    parentPort.once('message', async (message) => {
        //console.log("WORKER (RECEIVING):", message)
        const [ code, interpreter, challengeFile ] = message
        const userModule = String(Math.round(Math.random() * 100000000))
        const fileName =  userModule + '.py'
        const fileFullPath = process.env.TMP_DIR  + '/' + fileName
        const codeTestConfigDir = path.resolve(__dirname)

        const encondedCode = "# -*- coding: utf-8 -*-\n" + code

        process.env.CHALLENGE_FILE = process.env.TMP_DIR + '/' + '0000001.challenge.json'
        process.env.USER_FILE = fileFullPath
        process.env.USER_MODULE = userModule
        fs.writeFile(fileFullPath, encondedCode, (err) => {
            if (err) throw err
            const command = `${interpreterConfig[interpreter].command} ${codeTestConfigDir}/${interpreterConfig[interpreter].configFile}`
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
            //console.log("WORKER (SENDING)")
            try{
                parentPort.postMessage(result)
            } catch (err) {
                console.log(err)
            }
            fs.unlink(fileFullPath, (err) => {if (err) throw err})
        })
    })
}


const runTest = (code, interpreter = 'pytest', challengeFile) => {
    const worker = new Worker(__filename)
    const resultPromise = new Promise((resolve, reject) => {
        worker.once('message', (message) => {
            //console.log("MASTER (RECEIVED):", message)
            resolve(message)
        })
    })
    //console.log("MASTER (SENDING)")
    worker.postMessage([ code, interpreter, challengeFile ])
    return resultPromise
}


module.exports = runTest