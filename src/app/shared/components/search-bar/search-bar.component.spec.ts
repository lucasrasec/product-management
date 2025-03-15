import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, MatChipsModule, MatFormFieldModule, MatIconModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the input field', () => {
    component.currentValue = 'Product 1';
    component.resetInputFild();

    expect(component.currentValue).toBe('');
  });

  it('should emit selectedValues when emitFilter is called', () => {
    jest.spyOn(component.emitSearch, 'emit');

    const values = ['Product 1', 'Product 2'];
    component.selectedValues.set(values);

    component.emitFilter();

    expect(component.emitSearch.emit).toHaveBeenCalledWith(values);
  });
});