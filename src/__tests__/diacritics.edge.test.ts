import { Diacritics } from '../diacritics';
import { SingleChar } from '../interfaces/types';

describe('Diacritics - Edge Cases', () => {
    beforeAll(() => {
        Diacritics.initMap();
    });

    test('should handle strings with special characters', () => {
        expect(Diacritics.remove('Café@naïve#résumé$')).toBe('Cafe@naive#resume$');
    });

    test('should handle strings with emojis', () => {
        expect(Diacritics.remove('Café😊 naïve😢')).toBe('Cafe😊 naive😢');
    });

    test('should handle non-Latin characters', () => {
        expect(Diacritics.remove('こんにちは')).toBe('こんにちは');
        expect(Diacritics.remove('Caféこんにちは')).toBe('Cafeこんにちは');
    });

    test('should return empty array for characters without variations', () => {
        expect(Diacritics.getDiacriticVariations('$' as SingleChar)).toEqual([]);
    });

    test('should handle various non-ASCII characters', () => {
        const testCases = [
            { input: '©', expected: false },
            { input: '®', expected: false },
            { input: '±', expected: false },
            { input: '¿', expected: false },
            { input: 'é', expected: true }
        ];
        
        for (const { input, expected } of testCases) {
            expect(Diacritics.hasDiacritics(input)).toBe(expected);
            if (!expected) {
                expect(Diacritics.remove(input)).toBe(input);
            }
        }
    });
});
