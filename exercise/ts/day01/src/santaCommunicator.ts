import {Logger} from "./logger";
import {Reindeer} from "./reindeer";
import {Configuration} from "./configuration";

export type DaysBeforeChristmas = number;

export class SantaCommunicator {
    constructor(private readonly configuration: Configuration, private readonly logger: Logger) {
    }

    public composeMessage(reindeer: Reindeer): string {
        const daysBeforeReturn = this.daysBeforeReturn(reindeer);
        return `Dear ${reindeer.name}, please return from ${reindeer.location} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`;
    }

    public isOverdue(reindeer: Reindeer): boolean {
        if (this.daysBeforeReturn(reindeer) <= 0) {
            this.logger.log(`Overdue for ${reindeer.name} located ${reindeer.location}.`);
            return true;
        }
        return false;
    }

    private daysBeforeReturn(reindeer: Reindeer): number {
        return this.configuration.numberOfDaysBeforeChristmas - reindeer.daysForComingBack - this.configuration.numberOfDaysToRest;
    }
}