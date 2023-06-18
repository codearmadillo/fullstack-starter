import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  template: `<p>detail works!</p>`,
  styleUrls: ['./detail.component.scss'],
})
export default class DetailComponent {}
