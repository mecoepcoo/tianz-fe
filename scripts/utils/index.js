const path = require('path')
const fs = require('fs-extra')
const figlet = require('figlet')
const chalk = require('chalk')

// 将路径重置为scripts目录
function resolve(...args) {
  return path.resolve(__dirname, '..', ...args)
}

function getBinPath() {
  return resolve('..', 'node_modules/.bin')
}

function showWelcome() {
  const text = chalk.blue(
    figlet.textSync('tianz-fe', {
      horizontalLayout: 'full',
    })
  )
  console.log(text)
}

// 递归寻找package
function getPackages() {
  const packages = []
  const find = (dir) => {
    const files = fs.readdirSync(dir)
    files.forEach((file) => {
      const filePath = resolve(dir, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory() && file !== 'node_modules') {
        const packageJsonPath = resolve(filePath, 'package.json')
        if (fs.existsSync(packageJsonPath)) {
          const config = require(packageJsonPath)
          if (config.private === false) {
            const { buildOptions, description, version } = config
            packages.push({
              name: file,
              desc: description,
              version,
              buildOptions,
              path: filePath,
            })
          }
        }
        find(filePath)
      }
    })
  }
  find(resolve('..', 'packages'))
  return packages
}

module.exports = {
  resolve,
  getBinPath,
  showWelcome,
  getPackages,
}
