export interface MatchesPerRoundConfiguration {
  firstRound: number;
  secondRound: number;
  conferenceFinal: number;
  stanleyCupFinal: number;
}
export type FormatConfiguration = 'authentic' | '1x8';
export interface GeneratorConfiguration {
  format: FormatConfiguration;
  matchesPerRound: MatchesPerRoundConfiguration;
}
