# unplugin-config

[![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript_code style][code-style-image]][code-style-url]

[npm-image]: https://img.shields.io/npm/v/unplugin-config.svg
[npm-url]: https://npmjs.org/package/unplugin-config
[downloads-image]: https://img.shields.io/npm/dm/unplugin-config.svg
[downloads-url]: https://npmjs.org/package/unplugin-config
[code-style-image]: https://img.shields.io/badge/code__style-%40kirklin%2Feslint--config-brightgreen
[code-style-url]: https://github.com/kirklin/eslint-config/

<div align='left'>
<a href="README.md">English</a> | <b>简体中文</b>
<br>
</div>


该工具可生成Web应用程序的配置文件，并允许对全局变量进行定制化，无需重新打包即可外部修改。该工具的特点包括:

##### 特点
- ✨ 生成Web应用程序的配置文件。
- 🔨 允许对全局变量进行定制化。
- 🌈 内置支持dotenv，可以解析以指定前缀开头的环境变量。
- 🚀 支持与Vite、Webpack、Rollup等打包工具集成。
- 🎉 支持按需生成配置文件。
- 🌟 兼容TypeScript。

## 安装

```bash
npm i unplugin-config
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import ConfigPlugin from "unplugin-config/vite";

export default defineConfig({
  plugins: [
    ConfigPlugin({ /* options */ }),
  ],
});
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import ConfigPlugin from "unplugin-config/rollup";

export default {
  plugins: [
    ConfigPlugin({ /* options */ }),
  ],
};
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-config/webpack")({ /* options */ })
  ]
};
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ["unplugin-config/nuxt", { /* options */ }],
  ],
};
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-config/webpack")({ /* options */ }),
    ],
  },
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from "esbuild";
import ConfigPlugin from "unplugin-config/esbuild";

build({
  plugins: [ConfigPlugin()],
});
```

<br></details>

## 配置

options 对象包含以下属性：

- disabledConfig：一个布尔值，确定是否生成配置文件。
- globConfigFileName：配置文件的名称。
- outputDir：配置文件生成的目录。
- appName：应用程序的名称。
- envConfigPrefix：用于解析环境变量的前缀。

## 案例

[kirklin/celeris-admin](https://github.com/kirklin/celeris-admin)


## License

[MIT](./LICENSE) License © 2022 [Kirk Lin](https://github.com/kirklin)
