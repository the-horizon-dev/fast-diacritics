import { Diacritics } from '../diacritics';
import { SingleChar } from '../interfaces/types';

describe('Diacritics - Error Handling', () => {
    test('should throw error for non-string input', () => {
        expect(() => Diacritics.remove(null as unknown as string)).toThrow(TypeError);
        expect(() => Diacritics.remove(undefined as unknown as string)).toThrow(TypeError);
        expect(() => Diacritics.remove(42 as unknown as string)).toThrow(TypeError);
    });

    test('should throw error for non-string input in hasDiacritics', () => {
        expect(() => Diacritics.hasDiacritics(null as unknown as string)).toThrow(TypeError);
        expect(() => Diacritics.hasDiacritics(undefined as unknown as string)).toThrow(TypeError);
        expect(() => Diacritics.hasDiacritics(42 as unknown as string)).toThrow(TypeError);
    });

    test('should throw error for multi-character input in getDiacriticVariations', () => {
        expect(() => Diacritics.getDiacriticVariations('ab' as SingleChar)).toThrow('Input must be a single character');
    });
});
