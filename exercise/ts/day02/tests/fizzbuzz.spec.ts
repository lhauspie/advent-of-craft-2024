import {fizzbuzzFactory, max, min} from '../src/fizzbuzz';
import * as O from 'fp-ts/Option';
import {isNone, isSome} from 'fp-ts/Option';
import * as fc from 'fast-check';
import {pipe} from 'fp-ts/function';

describe('FizzBuzz should return', () => {
    const fizzbuzz = fizzbuzzFactory(new Map([
        [3, 'Fizz'],
        [5, 'Buzz'],
        [7, 'Whizz'],
        [11, 'Bang'],
    ]));

    test.each([
        [1, '1'],
        [67, '67'],
        [82, '82'],
        [3, 'Fizz'],
        [66, 'FizzBang'],
        [99, 'FizzBang'],
        [5, 'Buzz'],
        [50, 'Buzz'],
        [85, 'Buzz'],
        [7, 'Whizz'],
        [77, 'WhizzBang'],
        [35, 'BuzzWhizz'],
        [15, 'FizzBuzz'],
        [30, 'FizzBuzz'],
        [45, 'FizzBuzz']
    ])('its representation %s -> %s', (input, expectedResult) => {
        const conversionResult = fizzbuzz(input);
        expect(isSome(conversionResult)).toBeTruthy();

        if (isSome(conversionResult)) {
            expect(conversionResult.value).toBe(expectedResult);
        }
    });

    test('valid strings for numbers between 1 and 100', () => {
        fc.assert(
            fc.property(
                fc.integer().filter(n => n >= min && n <= max),
                (n) => {
                    console.log(n, fizzbuzz(n))
                    return isConvertValid(n);
                }
            )
        );
    });

    const isConvertValid = (input: number): boolean => pipe(
        fizzbuzz(input),
        O.exists(result => validStringsFor(input).includes(result))
    );

    const validStringsFor = (x: number): string[] => [
        'Fizz',
        'FizzBuzz', 'FizzBuzzWhizz', 'FizzBuzzBang', 'FizzBuzzWhizzBang',
        'FizzWhizz', 'FizzWhizzBang',
        'FizzBang',
        'Buzz',
        'BuzzWhizz', 'BuzzWizzBang',
        'BuzzBang',
        'Whizz',
        'WhizzBang',
        'Bang',
        x.toString()
    ];

    test('none for numbers out of range', () => {
        fc.assert(
            fc.property(
                fc.integer().filter(n => n < min || n > max),
                (n) => isNone(fizzbuzz(n))
            )
        );
    });
});