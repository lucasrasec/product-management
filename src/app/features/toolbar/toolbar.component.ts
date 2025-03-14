import { Component, ElementRef, inject, Input, Output, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SearchProductFilter } from '../../shared/models/product';
import { EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, SearchBarComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @ViewChild('createProductDialog') createProductDialog!: ElementRef<HTMLHtmlElement>
  @Output() emitFilter = new EventEmitter<SearchProductFilter>();
  @Output() createAction = new EventEmitter();
  @Input() activeSearch = true;

  public filter: SearchProductFilter = {
    name: [],
    category: []
  }

  updateFilter(value: string[], field: keyof SearchProductFilter): void {
    this.filter[field] = value;
    this.emitFilter.emit(this.filter);
  }

  createProduct() {
    this.createAction.emit()
  }
}
