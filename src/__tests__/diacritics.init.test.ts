import { DIACRITIC_MAPPINGS } from '../constants/mappings';
import { Diacritics } from '../diacritics';

type TestDiacritics = {
    initialized: boolean;
    diacriticsMap: Record<string, string>;
    replacementList: Array<{ base: string; chars: string }>;
};

describe('Diacritics - Initialization', () => {
    beforeEach(() => {
        const diacritics = Diacritics as unknown as TestDiacritics;
        diacritics.initialized = false;
        diacritics.diacriticsMap = {};
    });

    test('should initialize only once', () => {
        const diacritics = Diacritics as unknown as TestDiacritics;
        Diacritics.initMap();
        const initialMap = { ...diacritics.diacriticsMap };
        Diacritics.initMap();
        expect(diacritics.diacriticsMap).toEqual(initialMap);
    });

    test('should throw error on invalid mapping data', () => {
        const diacritics = Diacritics as unknown as TestDiacritics;
        const originalList = diacritics.replacementList;
        
        Object.defineProperty(diacritics, 'replacementList', {
            value: [{ base: '', chars: 'test' }]
        });
        
        expect(() => Diacritics.initMap()).toThrow('Invalid mapping data: base and chars must be non-empty strings');
        
        Object.defineProperty(diacritics, 'replacementList', {
            value: originalList
        });
    });

    test('should handle string error during initialization', () => {
        const diacritics = Diacritics as unknown as TestDiacritics;
        
        Object.defineProperty(diacritics, 'replacementList', {
            get: () => { throw new Error("String error"); }
        });
        
        expect(() => Diacritics.initMap()).toThrow('Failed to initialize diacritics map: Unknown error');
        
        Object.defineProperty(diacritics, 'replacementList', {
            value: DIACRITIC_MAPPINGS
        });
    });
});
