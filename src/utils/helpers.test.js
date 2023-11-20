import { compareIgnoreCase, trimFormData } from "./helpers";

describe('compareIgnoreCase', () => {
    it('throws error if called with no args', () => {
        const callWithNoArgs = () => compareIgnoreCase();

        expect(callWithNoArgs)
        .toThrow('Function was called with incorrect and/or insufficient args');
    });

    it('throws error if called with insufficient args', () => {
        const callWithInsufficientArgs = () => compareIgnoreCase('arg1');

        expect(callWithInsufficientArgs)
        .toThrow('Function was called with incorrect and/or insufficient args');
    });

    it('returns true if provided strings are same irrespective of case', () => {
        expect(compareIgnoreCase('aBc', 'AbC')).toBe(true);
    });
});

describe('trimFormData', () => {
    it('throws an error when called with no arguments', () => {
        const callWithNoArgs = () => trimFormData();

        expect(callWithNoArgs).toThrow('Function was called with an incorrect arg');
    });

    it('throws an error when called with incorrect arguments', () => {
        const callWithNoArgs = () => trimFormData('');

        expect(callWithNoArgs).toThrow('Function was called with an incorrect arg');
    });

    it('returns trimmed values of object', () => {
        const untrimmed = {
            name: '    John    '
        };

        expect(trimFormData(untrimmed)).toEqual({ name: 'John' });
    });
});