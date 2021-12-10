# Monorepo
这个项目为工具库的开发提供开箱即用的 `rollup + typescript + babel + lint + jest` 开发环境，各工具包的文档在各分包自己的readme中。

## 环境准备
- Node.js LTS
- pnpm 6+
- jest 27+

## 起步
- 初始化: `npm run setup`
- 测试：`npm test`
- 编译：`npm run build`
- lint：`npm run lint:ts`
- 提交代码：`npm run commit`

## 如何调试
### 打包单独模块
在 `script` 目录中为需要打包的模块单独建一个打包脚本，运行这个脚本来单独打包。

### 测试和调试
在 `__test__` 目录中可以新增测试脚本来进行单元测试。

利用yalc工具可以在其它项目中调试未正式发布的npm包：
```shell
# 安装yalc
$ npm i -g yalc
# 先把要调试的模块打好包，不需要提交代码，进入模块目录
$ cd packages/{包名}
# 本地发布
$ yalc publish
# 进入要调试的项目，安装本地依赖
$ cd xxx(其它项目)
$ yalc add {包名}
# 包被修改，重新发布后，更新依赖
$ yalc update
```

## 如何开发新的包
在`packages`目录下新建目录，目录名为项目包名，如`ibridge`，新增以下文件（可以从其他包复制过来）：
### package.json
修改name为`@tianz/包名`，按需修改其他属性。

### tsconfig.build.json
用于生成`d.ts`文件等，按需修改配置。

### 目录规范
src目录存放代码，__test__目录存放单元测试

## 发布
1. npm库，如果后续权限验证失败，找到全局`npmrc配置文件`，删除authtoken后重新登录
2. 运行`npm run commit`提交代码，写好changelog，再以docs类型提交
3. 运行`npm run release`，根据需要调整版本号
4. 发布成功后，打个tag，写好必要的版本说明
