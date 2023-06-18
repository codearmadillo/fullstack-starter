import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brackets',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- bracket -->

    <ng-template #matchup let-id="id">
      <section [id]="id" class="max-w-xs relative bg-white border border-solid border-slate-200 rounded-2xl h-8 sm:rounded-3xl sm:h-12 lg:rounded-[2rem] lg:h-16 transition hover:shadow-sm hover:cursor-pointer">
        <!-- team -->
        <div class="h-full p-1 absolute left-0">
          <div class="relative flex items-center justify-center h-full aspect-square">
            <div class="relative w-full h-full p-1 z-10 rounded-full overflow-hidden">
              <div class="relative w-full h-full rounded-full overflow-hidden bg-red-400">
                <img src="https://i.pinimg.com/564x/99/ba/6e/99ba6ed49ab284c317e8b14631322af6.jpg" class="w-full h-full object-contain" alt="Team image" />
              </div>
            </div>
            <div class="absolute w-full h-full rounded-full bg-white border-solid border-2 border-blue-500 border-box"></div>
          </div>
        </div>
        <div class="h-full p-1 absolute right-0">
          <div class="relative flex items-center justify-center h-full aspect-square">
            <div class="relative w-full h-full p-1 z-10 rounded-full overflow-hidden">
              <div class="relative w-full h-full rounded-full overflow-hidden bg-red-400">
                <img src="https://i.pinimg.com/564x/99/ba/6e/99ba6ed49ab284c317e8b14631322af6.jpg" class="w-full h-full object-contain" alt="Team image" />
              </div>
            </div>
            <div class="absolute w-full h-full rounded-full bg-white border-solid border-2 border-blue-500 border-box"></div>
          </div>
        </div>
      </section>
    </ng-template>

    <div class="bracket w-full h-full bg-yellow-500 flex justify-center items-center">
      <div class="card w-full p-1.5 sm:p-2 lg:p-8 bracket-grid">
        <ng-container *ngTemplateOutlet="matchup; context: {id: 'w_r1_s1'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'w_r2_s1'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'w_r1_s2'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'w_cf'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'w_r1_s3'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'w_r2_s2'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'w_r1_s4'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'e_r1_s1'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'e_r2_s1'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'e_r1_s2'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'e_cf'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'e_r1_s3'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'e_r2_s2'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'e_r1_s4'}"></ng-container>

        <ng-container *ngTemplateOutlet="matchup; context: {id: 'scf'}"></ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./brackets.component.scss'],
})
export class BracketsComponent {}
