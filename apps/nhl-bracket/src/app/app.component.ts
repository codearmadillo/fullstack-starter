import {Component, HostBinding} from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  template: `
    <aside class="max-w-xs md:px-3 md:py-6">
      <div class="hidden md:block md:card card--seamless bg-white h-full w-full">
        <a class="sidebar-link" [routerLink]="['/brackets']">Brackets</a>
        <a class="sidebar-link" [routerLink]="['/settings']">Settings</a>
      </div>
    </aside>
    <main class="h-full relative">
      <div class="absolute w-full h-full max-h-full box-border px-3 py-6 overflow-auto">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nhl-bracket';
  @HostBinding("class")
  get hostClass() {
    return `h-full w-full bg-slate-50 grid grid-cols-[auto_1fr] md:grid-cols-[minmax(200px,_25%)_1fr]`;
  }
}
