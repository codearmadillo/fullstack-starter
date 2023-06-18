import {Component, forwardRef, HostBinding, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiSelectOption} from "./multiselect.model";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <button class="relative flex grow shrink-0 items-center justify-center transition hover:bg-slate-400 focus:bg-slate-500 hover:text-white focus:text-white h-full" [class.selected]="value === option.value" *ngFor="let option of options" (click)="selectOption(option)">
        <span class="flex absolute w-full h-full left-0 top-0 items-center justify-center text-sm">{{ option.title }}</span>
    </button>
  `,
  styleUrls: ['./multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {

  @Input() options: MultiSelectOption[] = [];

  value = null;
  disabled = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  ngOnInit() {
    console.log(this.value);
  }

  selectOption(option: MultiSelectOption) {
    this.value = option.value;
    this.onChange(this.value);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
