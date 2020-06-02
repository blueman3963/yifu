const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts');

module.exports = withFonts(
  withCSS({
  webpack(config) {

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 100000,
                name: '[name].[ext]'
            }
        }
    })

    return config;
  }
  })
)
