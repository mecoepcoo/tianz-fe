const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const semver = require('semver')
const utils = require('../utils')

// 询问是否修改版本
async function inquireNeedUpdateVersion(packagePath) {
  const config = require(path.resolve(packagePath, 'package.json'))
  const { name, version } = config
  let updateVersionAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'update_version',
      message: `是否修改${chalk.blue(name)}的版本号（当前为：${chalk.blue(version)}）？`,
      default: false,
    }
  ])
  return updateVersionAnswer.update_version
}

// 询问如何修改版本
async function inquireUpdateVersion(packagePath) {
  const config = require(path.resolve(packagePath, 'package.json'))
  const { version: currentVersion } = config
  const prereleaseId = 'alpha'
  const patch = semver.inc(currentVersion, 'patch')
  const minor = semver.inc(currentVersion, 'minor')
  const major = semver.inc(currentVersion, 'major')
  const prepatch = semver.inc(currentVersion, 'prepatch', prereleaseId)
  const preminor = semver.inc(currentVersion, 'preminor', prereleaseId)
  const premajor = semver.inc(currentVersion, 'premajor', prereleaseId)
  let updateVersionAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'new_version',
      message: '请选择一个新版本',
      choices: [
        { name: `Patch ${patch}`, value: patch },
        { name: `Minor ${minor}`, value: minor },
        { name: `Major ${major}`, value: major },
        { name: `prepatch ${prepatch}`, value: prepatch },
        { name: `preminor ${preminor}`, value: preminor },
        { name: `Premajor ${premajor}`, value: patch },
        { name: '自定义版本', value: 'custom' },
      ],
    }
  ])
  if (updateVersionAnswer.new_version === 'custom') {
    let customVersionAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'new_version',
        message: '请输入新版本号',
        filter: semver.valid, // 如果没有通过校验，则返回null
      }
    ])
    return customVersionAnswer.new_version
  } else {
    return updateVersionAnswer.new_version
  }
}

// 确认
async function inquireEnsureRelease() {
  let ensureReleaseAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ensure_release',
      message: '即将发布，确认吗',
      default: false,
    }
  ])
  return ensureReleaseAnswer.ensure_release
}

module.exports = {
  inquireNeedUpdateVersion,
  inquireUpdateVersion,
  inquireEnsureRelease,
}
