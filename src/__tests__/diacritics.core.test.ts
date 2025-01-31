import { Diacritics } from '../diacritics';
import { SingleChar } from '../interfaces/types';

describe('Diacritics - Core Functionality', () => {
    beforeAll(() => {
        Diacritics.initMap();
    });

    test('should remove diacritics from a string', () => {
        const input = 'Café naïve résumé';
        const expected = 'Cafe naive resume';
        expect(Diacritics.remove(input)).toBe(expected);
    });

    test('should return the same string if no diacritics are present', () => {
        const input = 'Hello World';
        expect(Diacritics.remove(input)).toBe(input);
    });

    test('should handle empty strings', () => {
        expect(Diacritics.remove('')).toBe('');
    });

    test('should handle strings with only diacritics', () => {
        const input = 'éèêë';
        const expected = 'eeee';
        expect(Diacritics.remove(input)).toBe(expected);
    });

    test('should handle case preservation correctly', () => {
        const input = 'CAFÉ café';
        expect(Diacritics.remove(input, true)).toBe('CAFE cafe');
        expect(Diacritics.remove(input, false)).toBe('CAFe cafe');
        
        // Additional case preservation tests
        expect(Diacritics.remove('ÉTÉ', true)).toBe('ETE');
        expect(Diacritics.remove('ÉTÉ', false)).toBe('eTe');
        expect(Diacritics.remove('garçon GARÇON', true)).toBe('garcon GARCON');
        expect(Diacritics.remove('garçon GARÇON', false)).toBe('garcon GARcON');
    });

    test('should detect strings with diacritics', () => {
        expect(Diacritics.hasDiacritics('hello')).toBeFalsy();
        expect(Diacritics.hasDiacritics('café')).toBeTruthy();
    });

    test('should return diacritic variations', () => {
        const variations = Diacritics.getDiacriticVariations('a' as SingleChar);
        expect(variations).toContain('á');
        expect(variations).toContain('à');
        expect(variations).toContain('ä');
    });

    test('should handle combined diacritics', () => {
        expect(Diacritics.remove('ǘ')).toBe('u');  // u with diaeresis and acute
        expect(Diacritics.remove('ṝ')).toBe('r');  // r with macron and dot below
    });

    test('should preserve numbers and special characters', () => {
        expect(Diacritics.remove('100% préféré')).toBe('100% prefere');
        expect(Diacritics.remove('1²³ étage')).toBe('1²³ etage');
    });

    test('should handle mixed case with multiple diacritics', () => {
        expect(Diacritics.remove('CRÈME brûlée', true)).toBe('CREME brulee');
        expect(Diacritics.remove('ÉtÉ ChÂtEaU', true)).toBe('EtE ChAtEaU');
        expect(Diacritics.remove('ÉtÉ ChÂtEaU', false)).toBe('ete ChatEaU');
    });

    test('should preserve whitespace and formatting', () => {
        expect(Diacritics.remove('  café\t\ncrème  ')).toBe('  cafe\t\ncreme  ');
        expect(Diacritics.remove('\r\ngarçon\t')).toBe('\r\ngarcon\t');
    });

    test('should return variations for uppercase characters', () => {
        const upperVariations = Diacritics.getDiacriticVariations('E' as SingleChar);
        expect(upperVariations).toContain('É');
        expect(upperVariations).toContain('Ë');
        expect(upperVariations).toContain('Ê');
        
        // Additional variation tests
        const aVariations = Diacritics.getDiacriticVariations('a' as SingleChar);
        expect(aVariations).toContain('å');
        expect(aVariations).toContain('ā');
        expect(aVariations).toContain('ă');
        
        const oVariations = Diacritics.getDiacriticVariations('o' as SingleChar);
        expect(oVariations).toContain('ō');
        expect(oVariations).toContain('ő');
        expect(oVariations).toContain('ø');
    });

    test('should handle consecutive diacritics', () => {
        expect(Diacritics.remove('âêîôû')).toBe('aeiou');
        expect(Diacritics.hasDiacritics('âêîôû')).toBeTruthy();
        
        // Additional consecutive diacritics tests
        expect(Diacritics.remove('ǎěǐǒǔ')).toBe('aeiou');  // caron diacritics
        expect(Diacritics.remove('āēīōū')).toBe('aeiou');  // macron diacritics
        expect(Diacritics.remove('ąęįǫų')).toBe('aeiou');  // ogonek diacritics
        expect(Diacritics.hasDiacritics('ǎěǐǒǔ')).toBeTruthy();
        expect(Diacritics.hasDiacritics('āēīōū')).toBeTruthy();
    });

    test('should maintain character positions after removal', () => {
        const input = 'Hôtel à París';
        const output = Diacritics.remove(input);
        console.log(output);
        expect(output.length).toBe(13);
        expect(output.charAt(1)).toBe('o');
        expect(output.charAt(6)).toBe('a');
    });
});
