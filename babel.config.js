module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ]
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@commands': './src/commands',
          '@dao': './src/database/DAO',
          '@controllers': './src/controllers',
        }
      }]
    ],
    ignore: []
  }