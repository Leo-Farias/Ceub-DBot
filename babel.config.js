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
      "@babel/plugin-transform-async-to-generator",
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