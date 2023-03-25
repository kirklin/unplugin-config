# unplugin-config

[![NPM version](https://img.shields.io/npm/v/unplugin-config?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-config)

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
import Starter from "unplugin-config/vite";

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
});
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from "unplugin-config/rollup";

export default {
  plugins: [
    Starter({ /* options */ }),
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
import Starter from "unplugin-config/esbuild";

build({
  plugins: [Starter()],
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

To customize the global variables, create a configuration file with the required variables and save it in the output directory. The variables can be modified externally without the need for repackaging.

## Example

[kirklin/celeris-admin: Celeris Admin is a free and open-source middle and back-end template using the latest technology such as Vue3, Vite, TypeScript, Naive UI and monorepo for fast and efficient development. (github.com)](https://github.com/kirklin/celeris-admin)


## License

[MIT](./LICENSE) License © 2022 [Kirk Lin](https://github.com/kirklin)
