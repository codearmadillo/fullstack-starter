import {TEAMS} from "./teams";
import {TeamRating} from "../models/team";

export function getDefaultTeamRatings() {
  const ratings: {[key: number]: TeamRating} = {};

  TEAMS.forEach((team) => {
    ratings[team.id] = team.defaultRating;
  });

  return ratings;
}
