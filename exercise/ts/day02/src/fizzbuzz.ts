import {none, Option, some} from "fp-ts/Option";

export const min = 1;
export const max = 100;

let default_mapping: Map<number, string> = new Map([
    [3, 'Fizz'],
    [5, 'Buzz'],
]);

function convertSafely(mapping: Map<number, string>, input: number): string {
    let values: string[] = [];
    for (const [divisor, value] of mapping) {
        if (is(divisor, input)) {
            values.push(value);
        }
    }
    if (values.length > 0) {
        return values.join('');
    }
    return input.toString();
}

const is = (divisor: number, input: number): boolean => input % divisor === 0;
const isOutOfRange = (input: number): boolean => input < min || input > max;


export const fizzbuzzFactory = (mapping: Map<number, string> = default_mapping) => {
    return (input: number): Option<string> =>
        isOutOfRange(input)
            ? none
            : some(convertSafely(mapping, input));
}