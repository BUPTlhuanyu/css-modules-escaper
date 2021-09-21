# why
The animation of inline style will not work when you use css-modules with css-loader, and this project will make it work.

## in
```
.test1 {
    animation: 3s linear 1s demo1;
    width: 100px;
    height: 100px;
    background-color: red;
}

@keyframes demo1 {
    from {
        transform: translateX(0px);
    }
    to {
        transform: translateX(300px);
    }
}
```

## out
```
._SLSqn_M6Y6lv44JVeE6 {
  animation: 3s 1s linear demo1;
  width: 100px;
  height: 100px;
  background-color: red;
}
@keyframes demo1 {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(300px);
  }
}
```

# how

## use as a loader
```
// ...
const WebpackCssModuleEscaper = require('css-modules-escaper');

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[hash:base64]',
                                getLocalIdent: (context, localIdentName, localName) => {
                                    return null;
                                }
                            }
                        }
                    },
                    // add escaper loader
                    'css-modules-escaper',
                    'less-loader',
                ],
            },
        ]
    },
    plugins: [
        // add escaper plugin
        new WebpackCssModuleEscaper.plugin(),
        // ...
    ]
}
```

## use as a postcss-plugin

```
// ...
const WebpackCssModuleEscaper = require('css-modules-escaper');

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[hash:base64]',
                                getLocalIdent: (context, localIdentName, localName) => {
                                    return null;
                                }
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require.resolve('css-modules-escaper/postcss-plugin')
                                ],
                            },
                        },
                    },
                    'less-loader',
                ],
            },
        ]
    },
    plugins: [
        new WebpackCssModuleEscaper.plugin(),
        // ...
    ]
}
```
