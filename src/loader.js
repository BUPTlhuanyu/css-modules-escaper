/**
 * 加前缀
 */
const CssSyntaxError = require('./CssSyntaxError');
const postcssEscapeKeyframe = require('./postcss-plugin');
const postcss = require('postcss');

// TODO：
// 1. options 支持更多属性逃逸 css modules 的处理
// 2. 调整为 plugin，提高通用性，不用手动调整位置，方便设置随机数
module.exports = async function (content) {
    let result;
    const callback = this.async();
    try {
        result = await postcss([postcssEscapeKeyframe]).process(content, {
            hideNothingWarning: true,
            from: this.resourcePath,
            to: this.resourcePath
        });
    } catch (error) {
        if (error.file) {
            this.addDependency(error.file);
        }

        callback(error.name === 'CssSyntaxError' ? new CssSyntaxError(error) : error);
        return;
    }
    const map = result.map ? result.map.toJSON() : undefined;
    const ast = {
        type: 'postcss',
        version: result.processor.version,
        root: result.root
    };
    callback(null, result.css, map, { ast });
}
