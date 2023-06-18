import {GeneratorConfiguration} from "../models/configuration";

export const DEFAULT_CONFIGURATION: GeneratorConfiguration = {
  format: 'authentic',
  matchesPerRound: {
    firstRound: 3,
    secondRound: 3,
    conferenceFinal: 3,
    stanleyCupFinal: 7
  }
}
