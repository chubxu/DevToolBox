const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      "appId": "dev.tool.box",
      "productName":"DevToolBox",
      "copyright":"Copyright © 2021",
      "preload": './src/preload.js',
      "dmg": {
        "window": {
            "x": 100,
            "y": 100,
        }
      },
    }
  }
  transpileDependencies: true,
  configureWebpack: {
    externals: {
      "fs": 'require("fs")',
      "path": 'require("path")',
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
})
