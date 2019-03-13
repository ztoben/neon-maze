const path = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  devServer: {
    port: 9999,
    open: true
  },
  publicPath: "/",
  configureWebpack: {
    plugins: [
      new WebpackPwaManifest({
        name: "Neon Maze",
        short_name: "neon-maze",
        description: "A colorful maze",
        background_color: "lightgray",
        orientation: "portrait",
        display: "standalone",
        start_url: ".",
        icons: [
          {
            src: path.resolve("src/assets/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512]
          }
        ]
      })
    ]
  }
};
