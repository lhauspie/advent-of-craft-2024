declare const __brand: unique symbol
type Brand<B> = { [__brand]: B }
export type Branded<T, B> = T & Brand<B>


export type ReindeerName = Branded<string, "ReindeerName">;
export namespace ReindeerName {
    export function of(value: string): ReindeerName {
        return value as ReindeerName ;
    }
}


export type Location = Branded<string, "Location">;
export namespace Location {
    export function of(value: string): Location {
        return value as Location;
    }
}

export type DaysForComingBack = Branded<number, "DaysForComingBack">
export namespace DaysForComingBack {
    export function of(value: number): DaysForComingBack {
        return value as DaysForComingBack;
    }
}

export class Reindeer {
    constructor(public readonly name: ReindeerName, public readonly location: Location, public readonly daysForComingBack: DaysForComingBack) {
    }
}
