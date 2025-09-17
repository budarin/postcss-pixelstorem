const defaultOpts = {
    base: 16,
    unit: 'rem',
    exclude: [],
    mediaQueries: false,
};
export default function pixelstorem(opts = {}) {
    opts = { ...defaultOpts, ...opts };
    return {
        postcssPlugin: 'pixelstorem',
        Declaration(decl) {
            if (opts.exclude?.includes(decl.prop))
                return;
            if (!decl.value.includes('px'))
                return;
            decl.value = decl.value.replace(/(\d*\.?\d+)px\b/g, (_, num) => {
                const converted = +num / (opts.base ?? 16);
                return `${converted}${opts.unit}`;
            });
        },
        AtRule(atRule) {
            if (opts.mediaQueries && atRule.name === 'media' && atRule.params.includes('px')) {
                atRule.params = atRule.params.replace(/(\d*\.?\d+)px\b/g, (_, num) => {
                    const converted = +num / (opts.base ?? 16);
                    return `${converted}${opts.unit}`;
                });
            }
            if (opts.mediaQueries && atRule.name === 'container' && atRule.params.includes('px')) {
                atRule.params = atRule.params.replace(/(\d*\.?\d+)px\b/g, (_, num) => {
                    const converted = +num / (opts.base ?? 16);
                    return `${converted}${opts.unit}`;
                });
            }
        },
    };
}
pixelstorem.postcss = true;
//# sourceMappingURL=index.js.map