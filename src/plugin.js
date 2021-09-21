/**
 * @file
 */
const ESCAPE_PREFIX = require('./postcss-plugin').__escapePrefix;

class WebpackCssModuleEscaperPlugin {
    apply(compiler) {
        const rules = compiler.options.module.rules;
        for (let rule of rules) {
            if (Array.isArray(rule.use)) {
                for (let loader of rule.use) {
                    if (
                        loader.loader === 'css-loader' &&
                        loader.options &&
                        loader.options.modules &&
                        typeof loader.options.modules.getLocalIdent === 'function'
                    ) {
                        const getLocalIdent = loader.options.modules.getLocalIdent;
                        loader.options.modules.getLocalIdent = (context, localIdentName, localName) => {
                            if (localName?.startsWith(ESCAPE_PREFIX)) {
                                return localName.replace(ESCAPE_PREFIX, '');
                            } else {
                                return getLocalIdent(context, localIdentName, localName);
                            }
                        }
                    }
                }
            }
        }

        compiler.options.module.rules = [
            ...rules
        ];
    }
}
module.exports = WebpackCssModuleEscaperPlugin;
