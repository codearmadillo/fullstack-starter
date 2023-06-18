import {Division} from "./division";
import {Conference} from "./conference";

export type TeamRating = [
  offense: number,
  defense: number,
  goaltending: number,
  superstar: number,
  xfactor: number
]
export class Team {
  id!: number;
  name!: string;
  logoUrl?: string;
  defaultRating!: TeamRating;
  division!: Division;

  constructor(id: number, name: string, defaultRating: TeamRating, division: Division) {
    this.id = id;
    this.name = name;
    this.defaultRating = defaultRating;
    this.division = division;
  }

  public get conference() {
    if (this.division & Conference.EAST) {
      return Conference.EAST
    }
    return Conference.WEST;
  }
}
