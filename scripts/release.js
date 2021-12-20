const shell = require('shelljs')
const chalk = require('chalk')
const cowsay = require('cowsay')
const utils = require('./utils')
const releaseInquirer = require('./inquirer/release')
const buildTools = require('./buildtools')
const errorCodes = require('./errors')

if (process.platform === 'win32') {
  shell.exec('chcp 65001')
}

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
  // 发布，需要提前登录npm
  let ensureRelease = await releaseInquirer.inquireEnsureRelease()
  if (!ensureRelease) {
    console.log(chalk.red('未发布，请确认流程后重试'))
    return
  }
  for (let package of result.data.packages) {
    shell.cd(package.path)
    shell.exec('npm publish --access public')
    console.log(chalk.green(`${package.name}发布完成`))
  }
  shell.cd(utils.resolve('..'))
  console.log(chalk.green('发布全部完成，请确认'))
}

run()
