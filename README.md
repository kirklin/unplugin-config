# unplugin-config

[![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript_code style][code-style-image]][code-style-url]

[npm-image]: https://img.shields.io/npm/v/unplugin-config.svg
[npm-url]: https://npmjs.org/package/unplugin-config
[downloads-image]: https://img.shields.io/npm/dm/unplugin-config.svg
[downloads-url]: https://npmjs.org/package/unplugin-config
[code-style-image]: https://img.shields.io/badge/code__style-%40kirklin%2Feslint--config-brightgreen
[code-style-url]: https://github.com/kirklin/eslint-config/

<div align='center'>
<b>English</b> | <a href="README.zh-cn.md">简体中文</a>
<br>
</div>


A tool that generates configuration files for web applications, allowing customization of global variables that can be externally modified without the need for repackaging.

##### Features
- ✨ Generates configuration files for web applications.
- 🔨 Allows customization of global variables.
- 🌈 Built-in support for dotenv, enabling parsing of environment variables starting with a specified prefix.
- 🚀 Supports packaging with Vite, Webpack, Rollup, and more.
- 🎉 Tree-shakable, generates only the configuration file required for the application.
- 🌟 Compatible with TypeScript.

## Install

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

## Configuration

The options object contains the following properties:

- disabledConfig: A boolean value that determines whether the configuration file is generated.
- globConfigFileName: The name of the configuration file.
- outputDir: The directory where the configuration file is generated.
- appName: The name of the application.
- envConfigPrefix: The prefix for the environment variables to be parsed.

## Example

[kirklin/celeris-admin](https://github.com/kirklin/celeris-admin)


## License

[MIT](./LICENSE) License © 2022-PRESENT [Kirk Lin](https://github.com/kirklin)
