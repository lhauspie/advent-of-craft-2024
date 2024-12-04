export type ReinderName = string;
export type Location = string;
export type DaysForComingBack = number;

export class Reindeer {
    constructor(public readonly name: ReinderName, public readonly location: Location, public readonly daysForComingBack: DaysForComingBack) {
    }
}
