export type SingleChar = string & { readonly length: 1 };

export interface RemoveOptions {
    preserveCase?: boolean;
}

export function isSingleChar(str: string): str is SingleChar {
    // Count Unicode code points rather than UTF-16 code units
    return Array.from(str).length === 1;
}
