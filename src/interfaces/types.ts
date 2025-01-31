export type SingleChar = string & { readonly length: 1 };

export interface RemoveOptions {
    preserveCase: boolean;
}

export function isSingleChar(str: string): str is SingleChar {
    return str.length === 1;
}
