import {SantaCommunicator} from "../src/santaCommunicator";
import {TestLogger} from "./doubles/testLogger";
import {Reindeer, ReindeerName, Location, DaysForComingBack} from "../src/reindeer";
import {Configuration} from "../src/configuration";

const SantaCommunicatorSpec = ReindeerName.of('Dasher');
const NORTH_POLE = Location.of('North Pole');
const numberOfDaysToRest = 2;
const numberOfDayBeforeChristmas = DaysForComingBack.of(24);

describe('SantaCommunicator', () => {
    let communicator: SantaCommunicator;
    let configuration: Configuration;
    let logger: TestLogger;

    beforeEach(() => {
        logger = new TestLogger();
        configuration = new Configuration(numberOfDaysToRest, numberOfDayBeforeChristmas);
        communicator = new SantaCommunicator(configuration, logger);
    });

    test('composeMessage', () => {
        const reindeer = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, DaysForComingBack.of(5));
        const message = communicator.composeMessage(reindeer);
        expect(message).toEqual('Dear Dasher, please return from North Pole in 17 day(s) to be ready and rest before Christmas.');
    });

    test('shouldDetectOverdueReindeer', () => {
        const reindeer = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, numberOfDayBeforeChristmas);
        const overdue = communicator.isOverdue(reindeer);

        expect(overdue).toBeTruthy();
        expect(logger.getLog()).toEqual('Overdue for Dasher located North Pole.');
    });

    test('shouldReturnFalseWhenNoOverdue', () => {
        let daysForComingBack = DaysForComingBack.of(numberOfDayBeforeChristmas - numberOfDaysToRest - 1);
        const reindeer = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, daysForComingBack);
        const overdue = communicator.isOverdue(reindeer);
        expect(overdue).toBeFalsy();
    });
})
;