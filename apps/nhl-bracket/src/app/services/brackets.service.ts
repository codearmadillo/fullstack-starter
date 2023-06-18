import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Bracket} from "../models/bracket";
import {GeneratorConfiguration} from "../models/configuration";
import {TeamRating} from "../models/team";

@Injectable({providedIn: 'root'})
export class BracketsService {

  private readonly BRACKETS_STORAGE_KEY = 'brackets';
  private readonly $brackets: BehaviorSubject<Bracket[]>;

  public get brackets() {
    return this.$brackets;
  }

  constructor() {
    this.$brackets = new BehaviorSubject<Bracket[]>(this.loadBrackets());
    this.saveBrackets();
  }

  createBracket(title: string, configuration: GeneratorConfiguration, teamRatings: {[key: number]: TeamRating}) {
    const bracket: Bracket = new Bracket(title, configuration, teamRatings);

    const brackets = this.$brackets.getValue();
    brackets.push(bracket);

    this.$brackets.next(brackets);
    this.saveBrackets();
  }
  deleteBracket(id: string) {
    const brackets = this.$brackets.getValue().filter((bracket) => {
      return bracket.id !== id;
    });
    this.$brackets.next(brackets);
    this.saveBrackets();
  }

  private saveBrackets() {
    localStorage.setItem(this.BRACKETS_STORAGE_KEY, JSON.stringify(this.$brackets.getValue()));
  }

  private loadBrackets() {
    let brackets: Bracket[] = [];

    const loadedString = localStorage.getItem(this.BRACKETS_STORAGE_KEY);
    if (loadedString !== null) {
      try {
        brackets = JSON.parse(loadedString) as Bracket[];
      } catch(e) {
        console.error(`Failed to load brackets`);
      }
    }

    return brackets;
  }

}
