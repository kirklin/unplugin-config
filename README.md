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

The `Options` object contains the following properties:

### Application Options (`appName` and `baseDir`)

- `appName` (string, optional): The name of the application.
- `baseDir` (string, optional): The base directory for the output.

### Configuration File Options (`configFile`)

- `generate` (boolean, optional): Enable or disable generating the configuration file. Default is `true`.
- `fileName` (string, optional): The name of the global configuration file. Default is `"config.js"`.
- `outputDir` (string, optional): The directory where the configuration file is generated. Default is `"./dist"`.

### HTML Injection Options (`htmlInjection`)

- `enable` (boolean, optional): Enable or disable injecting configuration into HTML files. Default is `true`.
- `templates` (string[], optional): An array of template files to transform.
- `position` (string, optional): The position where the configuration script is injected into HTML files. Possible values are `"head"`, `"body"`, `"head-prepend"`, or `"body-prepend"`. Default is `"head-prepend"`.
- `decodeEntities` (boolean, optional): Whether to decode HTML entities in the injected HTML code. If set to `true`, HTML entities in the injected HTML code will be decoded. Default is `false`.

### Environment Variables Options (`envVariables`)

- `prefix` (string, optional): The prefix for environment variables used in configuration.
- `files` (string[], optional): An array of configuration files to load environment variables from.

### Example

```javascript
const configurationOptions = {
  appName: "MyApp",
  baseDir: "/",
  configFile: {
    generate: true,
    fileName: "_app.config.js",
    outputDir: "dist",
  },
  htmlInjection: {
    enable: true,
    templates: ["index.html"],
    position: "head-prepend",
  },
  envVariables: {
    prefix: "VITE_GLOB_",
    files: [".env.production", ".env"],
  },
};
```


## Example

[kirklin/celeris-admin](https://github.com/kirklin/celeris-admin)


## License

[MIT](./LICENSE) License © 2022-PRESENT [Kirk Lin](https://github.com/kirklin)
