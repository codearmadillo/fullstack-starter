import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'fullstack-starter-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <button (click)="sendRequest()">OK</button>
    <button (click)="sendUnauthorized()">401</button>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private readonly http: HttpClient) { }
  sendRequest() {
    this.http.get(`${environment.apiHost}`).subscribe(
      (f) => {
        console.log(f);
      }
    );
  }
  sendUnauthorized() {
    this.http.get(`${environment.apiHost}/unauthorized`).subscribe(
      (f) => {
        console.log(f);
      }
    );
  }
}
