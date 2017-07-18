#!/bin/bash

touch webpack.config.js
touch postcss.config.js
mkdir ./dist
mkdir -p ./src/components
mkdir -p ./src/containers
mkdir -p ./src/templates
mkdir __mocks__

touch ./src/templates/index.tpl.html
touch server.js
yarn init -y

# dependencies
yarn add babel-plugin-react-css-modules
yarn add babel-polyfill
yarn add bluebird
yarn add express
yarn add react
yarn add react-dom
yarn add lodash

# devDependencies
yarn add babel-core --dev
yarn add babel-eslint --dev
yarn add babel-loader --dev
yarn add babel-plugin-transform-class-properties --dev
yarn add babel-plugin-transform-es2015-modules-commonjs --dev
yarn add babel-plugin-transform-object-rest-spread --dev
yarn add babel-preset-bluebird --dev
yarn add babel-preset-env --dev
yarn add babel-preset-react --dev
yarn add browserslist --dev
yarn add cross-env --dev
yarn add css-loader --dev
yarn add directory-named-webpack-plugin --dev
yarn add enzyme --dev
yarn add eslint --dev
yarn add eslint-config-standard --dev
yarn add eslint-config-standard-react --dev
yarn add eslint-plugin-babel --dev
yarn add eslint-plugin-compat --dev
yarn add eslint-plugin-html --dev
yarn add eslint-plugin-import --dev
yarn add eslint-plugin-jest --dev
yarn add eslint-plugin-lodash-fp --dev
yarn add eslint-plugin-node --dev
yarn add eslint-plugin-promise --dev
yarn add eslint-plugin-react --dev
yarn add eslint-plugin-standard --dev
yarn add extract-text-webpack-plugin --dev
yarn add file-loader --dev
yarn add html-webpack-plugin --dev
yarn add identity-obj-proxy --dev
yarn add jest --dev
yarn add jest-css-modules --dev
yarn add json-loader --dev
yarn add postcss-import --dev
yarn add postcss-loader --dev
yarn add react-hot-loader@next --dev
yarn add react-test-renderer --dev
yarn add style-loader --dev
yarn add stylelint --dev
yarn add stylelint-config-standard --dev
yarn add stylelint-no-unsupported-browser-features --dev
yarn add webpack --dev
yarn add webpack-dev-middleware --dev
yarn add webpack-hot-middleware --dev

cat > .babelrc <<- EOF
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["last 2 versions", "last 2 ie versions", "last 3 safari versions"]
      },
      "debug": false
    }],
    "react",
    "bluebird"
  ],
  "plugins": [
    "transform-class-properties",
    "transform-object-rest-spread"
  ],
  "env": {
    "test": {
      "plugins": [
        "transform-es2015-modules-commonjs",
        ["react-css-modules", {
          "context": "./src",
          "exclude": "node_modules",
          "generateScopedName": "[local]"
        }]
      ]
    },
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    }
  }
}
EOF
