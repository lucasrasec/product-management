import { Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search-bar',
  imports: [MatChipsModule, MatFormFieldModule, MatIconModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @ViewChild('valueInput') valueInput!: ElementRef<HTMLInputElement>;
  @Input() searchField!: string;
  @Output() emitSearch = new EventEmitter<string[]>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public selectedValues = signal<string[]>([]);
  public currentValue: string = '';

  resetInputFild() {
    this.currentValue = '';
  }

  emitFilter() {
    this.emitSearch.emit(this.selectedValues());
  }

  add(event: MatChipInputEvent) {
    const value = event.value.trim();
    let change = false;

    if (value) {
      this.selectedValues.update((products) => {
        const valueExist = products.includes(value);

        if (!valueExist) {
          change = true;
          return [...products, value];
          
        }

        return products
      });
      this.emitFilter();
      if (change) this.resetInputFild();
    }
  }

  remove(product: string) {
    this.selectedValues.update(values => values.filter((listedValue) => listedValue !== product));
    this.emitSearch.emit()
  }
}