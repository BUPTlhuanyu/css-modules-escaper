/**
 * @file postcss
 */
const postcss = require('postcss');
const {parse, serialize} = require('@hookun/parse-animation-shorthand');
const CssSyntaxError = require('./CssSyntaxError');

const ESCAPE_PREFIX = 'SAN_NATIVE_CLI' + Math.random().toString(36).slice(2);
const PREFIXERS = ['-webkit-', '-moz-', '-o-', ''];
const PREFIXED_ANIMATION = PREFIXERS.map(i => i + 'animation');
const PREFIXED_ANIMATION_NAME = PREFIXERS.map(i => i + 'animation-name');
const PREFIXED_KEYFRAMES = PREFIXERS.map(i => i + 'keyframes');

const postcssEscapeKeyframe = postcss.plugin('postcss-escape-keyframe', () => (css) => {
    css.walk(node => {
        if (node.type === 'decl') {
            if (PREFIXED_ANIMATION.indexOf(node.prop) > -1 && typeof node.value === 'string') {
                try {
                    const result = parse(node.value);
                    if (Array.isArray(result)) {
                        const postProcessedAnimation = result.map((animation) => {
                            animation.name = `${ESCAPE_PREFIX}${animation.name}`;
                            return serialize(animation);
                        }).join(',');
                        postProcessedAnimation && (node.value = postProcessedAnimation);
                    }
                } catch (error) {
                    throw new CssSyntaxError(error)
                }
            } else if (PREFIXED_ANIMATION_NAME.indexOf(node.prop) > -1) {
                node.value = `${ESCAPE_PREFIX}${node.value}`;
            }
        }

        if (node.type === 'atrule' && PREFIXED_KEYFRAMES.indexOf(node.name) > -1) {
            node.params = `${ESCAPE_PREFIX}${node.params}`;
        }
    });
});

postcssEscapeKeyframe.__escapePrefix = ESCAPE_PREFIX;
module.exports = postcssEscapeKeyframe;
