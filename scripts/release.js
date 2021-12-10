const shell = require('shelljs')
const chalk = require('chalk')
const cowsay = require('cowsay')
const utils = require('./utils')
const releaseInquirer = require('./inquirer/release')
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
  // 处理版本号
  for (let package of result.data.packages) {
    let needUpdateVersionAnswer = await releaseInquirer.inquireNeedUpdateVersion(package.path)
    if (needUpdateVersionAnswer) {
      let newVersion = await releaseInquirer.inquireUpdateVersion(package.path)
      if (newVersion) {
        // 修改package.json中的version
        shell.cd(package.path)
        shell.exec(`npm version ${newVersion}`)
        console.log(chalk.green(`${package.name}的版本号已经更新为${newVersion}`))
      }
    }
  }
  shell.cd(utils.resolve('..'))
  // 提交修改
  shell.exec('git add .')
  shell.exec('git commit -n -m "ore(release): bump version"')
  // TODO: 登录npm

  // TODO: 发布
}

run()
