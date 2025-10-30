import type { Declaration, AtRule } from 'postcss';
interface PixelstoremOptions {
    base?: number;
    unit?: 'rem' | 'em';
    exclude?: string[];
    mediaQueries?: boolean;
}
export declare function pixelstorem(opts?: PixelstoremOptions): {
    postcssPlugin: string;
    Declaration(decl: Declaration): void;
    AtRule(atRule: AtRule): void;
};
export declare namespace pixelstorem {
    var postcss: boolean;
}
export default pixelstorem;
//# sourceMappingURL=index.d.ts.map