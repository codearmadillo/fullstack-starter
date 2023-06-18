import {GeneratorConfiguration} from "./configuration";
import {TeamRating} from "./team";
import {TEAMS} from "../data/teams";
import {shuffle} from "../utils/array.utils";

const HOME_GAME_RATING = 1.5;
const SUPERSTAR_RATING = 2;
const XFACTOR_RATING = 4;

type Match = {
  homeTeamId: number;
  awayTeamId: number;
}
interface TeamResult {
  teamId: number;
  points: number;
  wins: number;
  losses: number;
  overtimeLosses: number;
  gamesPlayed: number;
}

export class Bracket {
  id: string;
  title: string;
  createdAt: Date;
  configuration: GeneratorConfiguration;
  teamResults: TeamResult[];

  constructor(title: string, matchesConfiguration: GeneratorConfiguration, teamRatings: {[key: number]: TeamRating}) {
    this.id = this.generateRandomId();
    this.title = title;
    this.createdAt = new Date();
    this.configuration = matchesConfiguration;
    this.teamResults = [];

    const season = this.generateSeason();
    this.teamResults = this.simulateSeason(season, teamRatings);

    console.log(this.teamResults);
  }

  private simulateSeason(season: Match[], teamRatings: {[key: number]: TeamRating}): TeamResult[] {
    // create empty result set
    const results: {[key: string]: TeamResult} = {};
    TEAMS.forEach((team) => {
      results[team.id.toString()] = {
        teamId: team.id,
        points: 0,
        wins: 0,
        losses: 0,
        overtimeLosses: 0,
        gamesPlayed: 0
      }
    });

    // start simulating season
    season.forEach((match) => {
      // Convert IDs into string
      const homeTeamIdString = match.homeTeamId.toString();
      const awayTeamIdString = match.awayTeamId.toString();

      // Calculate ratings
      const homeTeamBaseRating = teamRatings[match.homeTeamId];
      const awayTeamBaseRating = teamRatings[match.awayTeamId];

      const homeTeamRating = Math.ceil(this.teamRatingToBaseRating(homeTeamBaseRating) + HOME_GAME_RATING);
      const awayTeamRating = Math.ceil(this.teamRatingToBaseRating(awayTeamBaseRating));

      // Generate odds
      const odds: number[] = [];
      odds.push(...new Array(homeTeamRating).fill(0));
      odds.push(...new Array(awayTeamRating).fill(1));

      // Push OT loss odds
      odds.push(...new Array(Math.round(homeTeamRating * 0.15)).fill(2));
      odds.push(...new Array(Math.round(awayTeamRating * 0.15)).fill(3));

      // Get result
      const result = odds[Math.floor(Math.random() * odds.length)];

      // Pick a winner!
      const homeTeamWon = [ 0, 2 ].includes(result);
      const otWin = [ 2, 3 ].includes(result);


      // Add up results
      results[homeTeamIdString] = {
        ...results[homeTeamIdString],
        points: results[homeTeamIdString].points + (homeTeamWon ? 2 : (otWin ? 1 : 0)),
        wins: results[homeTeamIdString].wins + (homeTeamWon ? 1 : 0),
        losses: results[homeTeamIdString].losses + (homeTeamWon ? 0 : 1),
        overtimeLosses: results[homeTeamIdString].overtimeLosses + (homeTeamWon ? 0 : (otWin ? 1 : 0)),
        gamesPlayed: results[homeTeamIdString].gamesPlayed + 1
      }
      results[awayTeamIdString] = {
        ...results[awayTeamIdString],
        points: results[awayTeamIdString].points + (homeTeamWon ? (otWin ? 1 : 0) : 2),
        wins: results[awayTeamIdString].wins + (homeTeamWon ? 0 : 1),
        losses: results[awayTeamIdString].losses + (homeTeamWon ? 1 : 0),
        overtimeLosses: results[awayTeamIdString].overtimeLosses + (homeTeamWon ? (otWin ? 1 : 0) : 0),
        gamesPlayed: results[awayTeamIdString].gamesPlayed + 1
      }
    });

    // Merge result to array
    let resultsArray: TeamResult[] = [];
    Object.keys(results).forEach((key: string) => {
      resultsArray = resultsArray.concat(results[key]);
    });

    return resultsArray;
  }

  private teamRatingToBaseRating(teamRating: TeamRating): number {
    return (teamRating[0] + teamRating[1] + teamRating[2]) / 3 + (teamRating[3] * SUPERSTAR_RATING) + (teamRating[4] * XFACTOR_RATING);
  }

  private generateSeason() {
    // Generate played matches
    const playedMatches: {[key: string]: Match[]} = {};
    TEAMS.forEach((teamA) => {
      TEAMS.forEach((teamB) => {
        if (teamA.id === teamB.id) {
          return true;
        }

        const identifier = [ teamA.id, teamB.id ].sort().join('_');

        // Only cover team-to-team rivalry once
        if (playedMatches[identifier] !== undefined) {
          return true;
        }

        // Create empty set of matches for rivalry
        const rivalry: Match[] = [];

        // Standard cross-conference matches
        rivalry.push(
          { homeTeamId: teamA.id, awayTeamId: teamB.id },
          { homeTeamId: teamB.id, awayTeamId: teamA.id },
        );

        // Conference matches
        if (teamA.conference === teamB.conference) {
          rivalry.push(
            { homeTeamId: teamA.id, awayTeamId: teamB.id },
            { homeTeamId: teamB.id, awayTeamId: teamA.id },
          );
        }

        // Division matches
        if (teamA.division === teamB.division) {
          rivalry.push(
            { homeTeamId: teamA.id, awayTeamId: teamB.id },
            { homeTeamId: teamB.id, awayTeamId: teamA.id },
          );
        }

        // Save rivalry
        playedMatches[identifier] = rivalry;

        return true;
      });
    });

    // Combine into one randomly-shuffled array
    let matches: Match[] = [];
    Object.keys(playedMatches).forEach((key) => {
      matches = matches.concat(playedMatches[key]);
    });

    // Iterate through matches and simulate season
    return shuffle<Match>(matches);
  }

  private generateRandomId() {
    const length = 32;
    const alphabet = 'ZXCVBNMLKJHGFDSAQWERTYUIOPzxcvbnmlkjhgfdsaqwertyuiop0123456789';
    let out = '';
    for (let i = 0; i < length; i++) {
      out += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    out += `-${new Date().getTime()}`;
    return out;
  }
}
