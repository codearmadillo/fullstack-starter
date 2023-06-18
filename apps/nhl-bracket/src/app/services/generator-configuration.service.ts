import {Injectable} from "@angular/core";
import {FormatConfiguration, GeneratorConfiguration, MatchesPerRoundConfiguration} from "../models/configuration";
import {DEFAULT_CONFIGURATION} from "../data/default-generator-configuration";
import {TeamRating} from "../models/team";
import {getDefaultTeamRatings} from "../data/default-team-ratings";

@Injectable({providedIn: 'root'})
export class GeneratorConfigurationService {

  private _ratings: {[key: number]: TeamRating} = {};
  private _configuration: GeneratorConfiguration;
  private readonly CONFIGURATION_STORAGE_KEY = "nhl-bracket_configuration_generator";
  private readonly TEAM_RATINGS_STORAGE_KEY = "nhl-bracket_configuration_team_ratings";

  constructor() {
    this._configuration = this.loadConfiguration();
    this._ratings = this.loadRatings();
    this.saveConfiguration();
    this.saveRatings();
  }

  public getConfiguration() {
    return this._configuration;
  }

  public getRatings() {
    return this._ratings;
  }

  public setFormat(formatConfiguration: FormatConfiguration) {
    const currentConfiguration = this.getConfigurationCopy();
    if (!currentConfiguration) {
      return;
    }
    this._configuration = {
      ...currentConfiguration,
      format: formatConfiguration
    }
    this.saveConfiguration();
  }

  public setTeamRatings(ratings: {[key: number]: TeamRating}) {
    const currentRatings = this.getRatings();
    if (!currentRatings) {
      return;
    }
    this._ratings = {
      ...currentRatings,
      ...ratings
    }
    this.saveRatings();
  }

  public setMatchesPerRound(matchesPerRoundConfiguration: MatchesPerRoundConfiguration) {
    const currentConfiguration = this.getConfigurationCopy();
    if (!currentConfiguration) {
      return;
    }
    this._configuration = {
      ...currentConfiguration,
      matchesPerRound: matchesPerRoundConfiguration
    }
    this.saveConfiguration();
  }

  private saveConfiguration() {
    localStorage.setItem(this.CONFIGURATION_STORAGE_KEY, JSON.stringify(this._configuration));
  }
  private loadConfiguration() {
    // default to DEFAULT
    let configuration = DEFAULT_CONFIGURATION;

    try {
      const storedConfigurationString = localStorage.getItem(this.CONFIGURATION_STORAGE_KEY);

      // If nothing can be loaded, store default configuration
      if (storedConfigurationString !== null) {
        configuration = JSON.parse(storedConfigurationString) as GeneratorConfiguration;
      }
    } catch(e) {
      console.error(`Failed to parse configuration - restoring default values`);
    }

    return configuration;
  }

  private saveRatings() {
    localStorage.setItem(this.TEAM_RATINGS_STORAGE_KEY, JSON.stringify(this._ratings));
  }

  private loadRatings() {
    let ratings = getDefaultTeamRatings();

    try {
      const storedRatings = localStorage.getItem(this.TEAM_RATINGS_STORAGE_KEY);
      if (storedRatings !== null) {
        ratings = JSON.parse(storedRatings) as {[key: number]: TeamRating};
      }
    } catch(e) {
      console.error(`Failed to parse ratings - restoring default values`);
    }

    return ratings;
  }

  private getConfigurationCopy() {
    if (!this._configuration) {
      return null;
    }
    return JSON.parse(JSON.stringify(this._configuration)) as GeneratorConfiguration;
  }
}
