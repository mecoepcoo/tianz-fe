const shell = require('shelljs')
const inquire = require('../inquirer/build')
const utils = require('../utils')
const errorCodes = require('../errors')

const rootPath = utils.resolve('..')
const binPath = utils.getBinPath()

async function selectBuildPackages() {
  // 选择需要构建的包
  const packageAnswers = await inquire.inquirePackage()
  return packageAnswers.package
}

function buildTs(package) {
  const { path: packagePath } = package
  shell.cd(packagePath)
  // 清理目录
  shell.exec(`${binPath}/rimraf ./dist`)
  // rollup
  shell.exec(`${binPath}/rollup -c=${rootPath}/build/rollup.config.js`)
  // tsc
  shell.exec(`${binPath}/tsc --project tsconfig.build.json`)
}

async function build() {
  let selectedPackages = await selectBuildPackages()
  const packages = []
  const tsPackages = []
  selectedPackages.forEach((pkg) => {
    switch (pkg.buildOptions?.type) {
      case 'ts':
        tsPackages.push(pkg)
      default:
        packages.push(pkg)
    }
  })
  if (!packages.length && !tsPackages.length) {
    // 没有选择任何包
    return {
      code: errorCodes.NO_PACKAGE_SELECTED,
    }
  }
  // 构建ts包
  tsPackages.forEach((package) => {
    buildTs(package)
  })
  return {
    code: 0,
    data: {
      packages: selectedPackages,
    },
  }
}

module.exports = {
  selectBuildPackages,
  buildTs,
  build,
}
