import type { Declaration, AtRule } from 'postcss';
interface PixelstoremOptions {
    base?: number;
    unit?: 'rem' | 'em';
    exclude?: string[];
    mediaQueries?: boolean;
}
export declare const pixelstorem: {
    (opts?: PixelstoremOptions): {
        postcssPlugin: string;
        Declaration(decl: Declaration): void;
        AtRule(atRule: AtRule): void;
    };
    postcss: boolean;
};
export {};
//# sourceMappingURL=index.d.ts.map