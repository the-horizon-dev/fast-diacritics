import { DIACRITIC_MAPPINGS } from './constants/mappings';
import type { ReplacementMapping } from './interfaces/replacementMapping';
import type { SingleChar } from './interfaces/types';
import { isSingleChar } from './interfaces/types';

/**
 * A class for handling diacritical marks in strings.
 * @class Diacritics
 * @public
 */
export class Diacritics {
    private static readonly replacementList: ReadonlyArray<ReplacementMapping> = DIACRITIC_MAPPINGS;
    private static diacriticsMap: Record<string, string> = {};
    private static initialized = false;

    /**
     * Initializes the internal diacritics mapping.
     * This is automatically called when needed but can be called manually for preloading.
     * @throws {Error} If the mapping data is invalid or initialization fails
     * @public
     */
    public static initMap(): void {
        if (this.initialized) return;
        
        try {
            for (const entry of this.replacementList) {
                if (!entry.base || !entry.chars) {
                    this.diacriticsMap = {};
                    this.initialized = false;
                    throw new Error('Invalid mapping data: base and chars must be non-empty strings');
                }
                
                for (const ch of entry.chars) {
                    this.diacriticsMap[ch] = entry.base;
                }
            }
            this.initialized = true;
        } catch (error: unknown) {
            this.diacriticsMap = {};
            this.initialized = false;
            if (error instanceof Error && error.message.startsWith('Invalid mapping data')) {
                throw error;
            }
            throw new Error('Failed to initialize diacritics map: Unknown error');
        }
    }

    /**
     * Removes diacritical marks from a string.
     * @param {string} str - The input string to process
     * @param {boolean} [preserveCase=true] - Whether to preserve the original case
     * @returns {string} The string with diacritical marks removed
     * @throws {TypeError} If input is not a string
     * @throws {Error} If initialization fails
     * @example
     * Diacritics.remove('café') // returns 'cafe'
     * Diacritics.remove('CAFÉ', true) // returns 'CAFE'
     * @public
     */
    public static remove(str: string, preserveCase = true): string {
        if (typeof str !== 'string') {
            throw new TypeError('Input must be a string');
        }

        if (!str) return str;

        if (!this.initialized) {
            this.initMap();
        }

        const normalized = str.normalize('NFD');
        const result = normalized.replace(/[\u0300-\u036f]/g, '').normalize('NFC');
        
        if (preserveCase) return result;

        return result.split('').map((char, index) => {
            const originalChar = str[index];
            const hadDiacritic = originalChar !== result[index];
            return hadDiacritic ? char.toLowerCase() : char;
        }).join('');
    }

    /**
     * Checks if a string contains diacritical marks.
     * @param {string} str - The input string to check
     * @returns {boolean} True if the string contains diacritical marks
     * @throws {TypeError} If input is not a string
     * @example
     * Diacritics.hasDiacritics('café') // returns true
     * Diacritics.hasDiacritics('cafe') // returns false
     * @public
     */
    public static hasDiacritics(str: string): boolean {
        if (typeof str !== 'string') {
            throw new TypeError('Input must be a string');
        }

        if (!this.initialized) {
            this.initMap();
        }

        // Using a safer regex pattern that checks for non-ASCII characters
        return /[^\x20-\x7E]/.test(str) && 
               str !== this.remove(str);
    }

    /**
     * Gets all possible diacritical variations of a character.
     * @param {SingleChar} char - A single character
     * @returns {string[]} Array of possible diacritical variations
     * @throws {Error} If input is not a single character
     * @example
     * Diacritics.getDiacriticVariations('a') // returns ['à', 'á', 'â', ...]
     * @public
     */
    public static getDiacriticVariations(char: SingleChar): string[] {
        if (!isSingleChar(char)) {
            throw new Error('Input must be a single character');
        }

        if (!this.initialized) {
            this.initMap();
        }

        return DIACRITIC_MAPPINGS
            .find(mapping => mapping.base === char)
            ?.chars.split('') ?? [];
    }
}