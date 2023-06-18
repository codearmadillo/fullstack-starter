import {Component, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Bracket} from "../../../models/bracket";
import {BracketsService} from "../../../services/brackets.service";
import {GeneratorConfigurationService} from "../../../services/generator-configuration.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  template: `
    <h1 class="typography-page-title">Brackets</h1>
    <section class="page-section card">
      <header class="flex">
        <h2 class="flex-auto typography-page-section-title">My lists</h2>
        <button class="button button--cta button--outline" (click)="onCreateBracket()">New bracket</button>
      </header>
      <div class="c-table">
        <div class="c-table-row c-table-row--header">
          <div class="c-cell c-cell--title">Title</div>
          <div class="c-cell c-cell--created">Created at</div>
          <div class="c-cell c-cell--delete"></div>
        </div>

        <div class="c-table-row cursor-pointer" *ngFor="let bracket of brackets()">
          <div [routerLink]="['/brackets/' + bracket.id]" class="c-cell c-cell--title">{{bracket.title}}</div>
          <div [routerLink]="['/brackets/' + bracket.id]" class="c-cell c-cell--created">{{bracket.createdAt | date:'short'}}</div>
          <div (click)="onDeleteBracket(bracket)" class="c-cell c-cell--delete">
            <fa-icon [icon]="faTrashIcon" class="delete-icon"></fa-icon>
          </div>
        </div>

      </div>
    </section>`,
  styleUrls: ['./list.component.scss'],
})
export default class ListComponent {
  faTrashIcon = faTrash;
  brackets = toSignal(this.bracketsService.brackets);

  constructor(private readonly bracketsService: BracketsService, private readonly generatorConfigurationService: GeneratorConfigurationService) {

  }

  onDeleteBracket(bracket: Bracket) {
    if (confirm(`Do you wish to delete bracket ${bracket.title}`)) {
      this.bracketsService.deleteBracket(bracket.id);
    }
  }
  onCreateBracket() {
    this.bracketsService.createBracket('My new bracket!', this.generatorConfigurationService.getConfiguration(), this.generatorConfigurationService.getRatings());
  }
}
