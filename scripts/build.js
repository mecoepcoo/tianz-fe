const chalk = require('chalk')
const cowsay = require('cowsay')
const utils = require('./utils')
const buildTools = require('./buildtools')
const errorCodes = require('./errors')

const run = async () => {
  utils.showWelcome()
  let result = await buildTools.build()
  if (result.code === errorCodes.NO_PACKAGE_SELECTED) {
    console.log(chalk.magenta(cowsay.say({
      text: '没有选择要构建的的包',
      e: 'oO',
      T: 'U '
    })))
    return
  }
  console.log(chalk.green('构建完成'))
}

run()
