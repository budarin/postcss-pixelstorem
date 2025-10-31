const defaultOpts = {
    base: 16,
    unit: 'rem',
    exclude: [],
    mediaQueries: false,
};
function hasDisableComment(node) {
    const prevNode = node.prev();
    if (prevNode && prevNode.type === 'comment') {
        const comment = prevNode;
        return comment.text.toLowerCase().includes('pxtorem-disable-next-line');
    }
    return false;
}
export function pixelstorem(opts = {}) {
    opts = { ...defaultOpts, ...opts };
    return {
        postcssPlugin: 'pixelstorem',
        Declaration(decl) {
            if (opts.exclude?.includes(decl.prop))
                return;
            if (hasDisableComment(decl))
                return;
            if (!decl.value.includes('px'))
                return;
            decl.value = decl.value.replace(/(\d*\.?\d+)px\b/g, (_, num) => {
                const converted = +num / (opts.base ?? 16);
                return `${converted}${opts.unit}`;
            });
        },
        AtRule(atRule) {
            if (hasDisableComment(atRule))
                return;
            if (opts.mediaQueries &&
                atRule.name === 'media' &&
                atRule.params.includes('px')) {
                atRule.params = atRule.params.replace(/(\d*\.?\d+)px\b/g, (_, num) => {
                    const converted = +num / (opts.base ?? 16);
                    return `${converted}${opts.unit}`;
                });
            }
            if (opts.mediaQueries &&
                atRule.name === 'container' &&
                atRule.params.includes('px')) {
                atRule.params = atRule.params.replace(/(\d*\.?\d+)px\b/g, (_, num) => {
                    const converted = +num / (opts.base ?? 16);
                    return `${converted}${opts.unit}`;
                });
            }
        },
    };
}
pixelstorem.postcss = true;
export default pixelstorem;
//# sourceMappingURL=index.js.map