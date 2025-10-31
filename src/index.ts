import type { Declaration, AtRule, Comment } from 'postcss';

interface PixelstoremOptions {
    base?: number;
    unit?: 'rem' | 'em';
    exclude?: string[];
    mediaQueries?: boolean;
}

const defaultOpts: PixelstoremOptions = {
    base: 16,
    unit: 'rem',
    exclude: [],
    mediaQueries: false,
};

function hasDisableComment(node: Declaration | AtRule): boolean {
    const prevNode = node.prev();
    if (prevNode && prevNode.type === 'comment') {
        const comment = prevNode as Comment;
        return comment.text.toLowerCase().includes('pxtorem-disable-next-line');
    }
    return false;
}

export function pixelstorem(opts: PixelstoremOptions = {}) {
    opts = { ...defaultOpts, ...opts };
    return {
        postcssPlugin: 'pixelstorem',

        Declaration(decl: Declaration) {
            if (opts.exclude?.includes(decl.prop)) return;
            if (hasDisableComment(decl)) return;

            if (!decl.value.includes('px')) return;
            decl.value = decl.value.replace(/(\d*\.?\d+)px\b/g, (_, num) => {
                const converted = +num / (opts.base ?? 16);
                return `${converted}${opts.unit}`;
            });
        },

        AtRule(atRule: AtRule) {
            if (hasDisableComment(atRule)) return;

            if (
                opts.mediaQueries &&
                atRule.name === 'media' &&
                atRule.params.includes('px')
            ) {
                atRule.params = atRule.params.replace(
                    /(\d*\.?\d+)px\b/g,
                    (_, num) => {
                        const converted = +num / (opts.base ?? 16);
                        return `${converted}${opts.unit}`;
                    }
                );
            }

            if (
                opts.mediaQueries &&
                atRule.name === 'container' &&
                atRule.params.includes('px')
            ) {
                atRule.params = atRule.params.replace(
                    /(\d*\.?\d+)px\b/g,
                    (_, num) => {
                        const converted = +num / (opts.base ?? 16);
                        return `${converted}${opts.unit}`;
                    }
                );
            }
        },
    };
}

pixelstorem.postcss = true;

export default pixelstorem;
