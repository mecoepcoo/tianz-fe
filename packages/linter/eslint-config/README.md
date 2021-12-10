# @tianz/eslint-config
团队内通用的eslint配置

## Quick-start
### 安装
确保已经安装好依赖：
```shell
npm i -D eslint @tianz/eslint-config-base
```

如果使用react：
```shell
npm i -D eslint-plugin-react eslint-plugin-react-hooks
```

如果使用typescript：
```shell
npm i -D typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

安装插件：
```shell
npm i -D @tianz/eslint-config
```

### 使用
在 `.eslintrc.js` 中添加配置：
```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    // ...按需配置
  },
  globals: {
    wx: 'readonly', // 配置自定义全局变量
  },
  extends: [
    '@tianz/eslint-config',
    '@tianz/eslint-config/react', // 按需配置
    '@tianz/eslint-config/typescript' // 按需配置
    // ...在这里加点别的你想要的
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json', // 配置tsconfig路径
    tsconfigRootDir: __dirname,
  },
  rules: {
    // ...
  },
}
```

### 与prettier一起用
#### 安装依赖
```shell
npm i -D prettier eslint-plugin-prettier eslint-config-prettier
```
#### 修改eslint配置
```javascript
{
  plugins: ['prettier'],
  extends: [
    // ...
    'prettier' // 确保prettier在最后
  ],
  rules: {
    'prettier/prettier': 'warn',
    // ...
  }
}
```

#### 添加prettier配置
```javascript
// .prettierrc.js 参考
module.exports = {
  printWidth: 100, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2,
  useTabs: false, // 注意：makefile文件必须使用tab
  singleQuote: true,
  semi: false,
  trailingComma: 'es5', //是否使用尾逗号，有三个可选值'<none|es5|all>'
  bracketSpacing: true, //对象大括号之间是否有空格，默认为true，效果：{ foo: bar }
  endOfLine: 'auto',
  arrowParens: 'always'
}
```

### 忽略
提供几个参考配置
#### .eslintignore
```
node_modules
**/*.js
**/*.jsx
**/*.ts
**/*.tsx
!src/**/*.js
!src/**/*.jsx
!src/**/*.ts
!src/**/*.tsx
setupTests.ts
**/*.d.ts
```

#### .prettierignore
```
**/*.js
!src/**/*.js
makefile
```
