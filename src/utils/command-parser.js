const PREFIX = process.env.PREFIX

const parseCommand = (content, returnType = 'Object') => {
    const args = content.substring(PREFIX.length).split(" ")

    const commandInput = content.slice(PREFIX.length + args[0].length).trim()

    
    if (returnType === 'list' || returnType === 'List'){
        return [ PREFIX, args[0], commandInput ]
    }
    
    else return {
        prefix: PREFIX,
        command: args[0],
        parameter: commandInput
    }
}

module.exports = parseCommand