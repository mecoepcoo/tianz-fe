const inquirer = require('inquirer')
const utils = require('../utils')

// 询问要构建哪个模块
function inquirePackage() {
  const packages = utils.getPackages()
  const choices = packages.map((package) => ({
    name: package.name,
    value: package,
  }))

  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'package',
      message: '请选择需要构建的模块',
      choices,
    }
  ])
}

module.exports = {
  inquirePackage,
}
