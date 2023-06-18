import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {faExplosion, faHand, faHockeyPuck, faShieldHalved, faStar} from "@fortawesome/free-solid-svg-icons";
import {Team, TeamRating} from "../../models/team";
import {TEAMS} from "../../data/teams";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GeneratorConfigurationService} from "../../services/generator-configuration.service";
import {DEFAULT_CONFIGURATION} from "../../data/default-generator-configuration";
import {MultiSelectOption} from "../../components/multiselect/multiselect.model";
import {MultiselectComponent} from "../../components/multiselect/multiselect.component";
import {FormatConfiguration} from "../../models/configuration";
import {getDefaultTeamRatings} from "../../data/default-team-ratings";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, MultiselectComponent],
  template: `
    <h1 class="typography-page-title">Settings</h1>
    <section class="page-section card">
      <h2 class="typography-page-section-title">Series configuration</h2>
      <label class="input-block">
        <span class="input-label typography-input-label">Games in first round</span>
        <input class="input-field" id="configuration_first_round_games" type="number" [ngModel]="firstRoundMatchCount()" (change)="firstRoundMatchCount.set(toNumber($any($event.target).value))" />
      </label>
      <label class="input-block">
        <span class="input-label typography-input-label">Games in second round</span>
        <input class="input-field" id="configuration_second_round_games" type="number" [ngModel]="secondRoundMatchCount()" (change)="secondRoundMatchCount.set(toNumber($any($event.target).value))" />
      </label>
      <label class="input-block">
        <span class="input-label typography-input-label">Games in conference final</span>
        <input class="input-field" id="configuration_cf_games" type="number" [ngModel]="conferenceFinalMatchCount()" (change)="conferenceFinalMatchCount.set(toNumber($any($event.target).value))" />
      </label>
      <label class="input-block">
        <span class="input-label typography-input-label">Games in Stanley cup final</span>
        <input class="input-field" id="configuration_scf_games" type="number" [ngModel]="stanleyCupFinalMatchCount()" (change)="stanleyCupFinalMatchCount.set(toNumber($any($event.target).value))" />
      </label>

      <footer class="form-footer">
        <button class="button button--warning button--outline" (click)="onConfigurationRevertToDefault()">Default settings</button>
        <button class="button button--cta button--solid ml-2" (click)="onConfigurationSave()">Save</button>
      </footer>
    </section>

    <section class="page-section card">
      <h2 class="typography-page-section-title">Team ratings</h2>
      <div class="c-table">
        <div class="c-table-row c-table-row--header">
          <div class="c-cell c-cell--title">Team name</div>
          <div class="c-cell c-cell--stat">
            <fa-icon class="header-icon" title="Offense" [icon]="hockeyPuckIcon"></fa-icon>
          </div>
          <div class="c-cell c-cell--stat">
            <fa-icon class="header-icon" title="Defense" [icon]="shieldIcon"></fa-icon>
          </div>
          <div class="c-cell c-cell--stat">
            <fa-icon class="header-icon" title="Goaltending" [icon]="handIcon"></fa-icon>
          </div>
          <div class="c-cell c-cell--stat">
            <fa-icon class="header-icon" title="Superstars" [icon]="starIcon"></fa-icon>
          </div>
          <div class="c-cell c-cell--stat">
            <fa-icon class="header-icon" title="XFactor" [icon]="explosionIcon"></fa-icon>
          </div>
        </div>

        <div class="c-table-row" *ngFor="let team of TEAMS">
          <div class="c-cell c-cell--title">{{team.name}}</div>
          <div class="c-cell c-cell--stat">
            <input class="input-field input-field--standalone appearance-none" type="number" min="0" max="100" [ngModel]="ratings()[team.id][0]" (change)="setTeamRating(team.id, toNumber($any($event.target).value), 0)" />
          </div>
          <div class="c-cell c-cell--stat">
            <input class="input-field input-field--standalone appearance-none" type="number" min="0" max="100" [ngModel]="ratings()[team.id][1]" (change)="setTeamRating(team.id, toNumber($any($event.target).value), 1)" />
          </div>
          <div class="c-cell c-cell--stat">
            <input class="input-field input-field--standalone appearance-none" type="number" min="0" max="100" [ngModel]="ratings()[team.id][2]" (change)="setTeamRating(team.id, toNumber($any($event.target).value), 2)" />
          </div>
          <div class="c-cell c-cell--stat">
            <input class="input-field input-field--standalone appearance-none" type="number" min="0" max="100" [ngModel]="ratings()[team.id][3]" (change)="setTeamRating(team.id, toNumber($any($event.target).value), 3)" />
          </div>
          <div class="c-cell c-cell--stat">
            <input class="input-field input-field--standalone appearance-none" type="number" min="0" max="100" [ngModel]="ratings()[team.id][4]" (change)="setTeamRating(team.id, toNumber($any($event.target).value), 4)" />
          </div>
        </div>
      </div>

      <footer class="form-footer">
        <button class="button button--warning button--outline" (click)="onRatingsRevertToDefault()">Default settings</button>
        <button class="button button--cta button--solid ml-2" (click)="onRatingsSave()">Save</button>
      </footer>
    </section>
  `,
  styleUrls: ['./settings.component.scss'],
})
export default class SettingsComponent {

  // Icons
  readonly shieldIcon = faShieldHalved;
  readonly explosionIcon = faExplosion;
  readonly handIcon = faHand;
  readonly hockeyPuckIcon = faHockeyPuck;
  readonly starIcon = faStar;

  // Generator configuration signals
  firstRoundMatchCount = signal(0);
  secondRoundMatchCount = signal(0);
  conferenceFinalMatchCount = signal(0);
  stanleyCupFinalMatchCount = signal(0);

  // Ratings model
  ratings = signal<{[key: number]: TeamRating}>({});

  // static values
  readonly TEAMS = TEAMS;

  constructor(private readonly generatorConfigurationService: GeneratorConfigurationService) {
    // Load generator configuration
    this.firstRoundMatchCount.set(this.generatorConfigurationService.getConfiguration().matchesPerRound.firstRound);
    this.secondRoundMatchCount.set(this.generatorConfigurationService.getConfiguration().matchesPerRound.secondRound);
    this.conferenceFinalMatchCount.set(this.generatorConfigurationService.getConfiguration().matchesPerRound.conferenceFinal);
    this.stanleyCupFinalMatchCount.set(this.generatorConfigurationService.getConfiguration().matchesPerRound.stanleyCupFinal);

    // Generate Model for ratings
    this.ratings.set(this.generatorConfigurationService.getRatings());
  }

  onRatingsSave() {
    this.generatorConfigurationService.setTeamRatings(this.ratings());
  }
  onRatingsRevertToDefault() {
    this.ratings.set(getDefaultTeamRatings());
    this.onRatingsSave();
  }

  onConfigurationSave() {
    this.generatorConfigurationService.setMatchesPerRound({
      firstRound: this.firstRoundMatchCount(),
      secondRound: this.secondRoundMatchCount(),
      conferenceFinal: this.conferenceFinalMatchCount(),
      stanleyCupFinal: this.stanleyCupFinalMatchCount()
    });
  }
  onConfigurationRevertToDefault() {
    this.firstRoundMatchCount.set(DEFAULT_CONFIGURATION.matchesPerRound.firstRound);
    this.secondRoundMatchCount.set(DEFAULT_CONFIGURATION.matchesPerRound.secondRound);
    this.conferenceFinalMatchCount.set(DEFAULT_CONFIGURATION.matchesPerRound.conferenceFinal);
    this.stanleyCupFinalMatchCount.set(DEFAULT_CONFIGURATION.matchesPerRound.stanleyCupFinal);
    this.onConfigurationSave();
  }

  setTeamRating(teamId: number, rating: number, index: number) {
    const ratings = this.ratings();
    ratings[teamId][index] = rating;
    this.ratings.set(ratings);
  }

  toNumber(value: string) {
    return parseInt(value, 10);
  }

}
