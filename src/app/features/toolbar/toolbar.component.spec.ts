import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SearchProductFilter } from '../../shared/models/product';
import { By } from '@angular/platform-browser';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, SearchBarComponent, MatToolbarModule, MatButtonModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter when updateFilter is called', () => {
    jest.spyOn(component.emitFilter, 'emit');

    const field: keyof SearchProductFilter = 'name';
    const value = ['Product 1'];

    component.updateFilter(value, field);

    expect(component.emitFilter.emit).toHaveBeenCalledWith({
      name: ['Product 1'],
      category: [],
    });
  });

  it('should emit createAction when createProduct is called', () => {
    jest.spyOn(component.createAction, 'emit');

    component.createProduct();

    expect(component.createAction.emit).toHaveBeenCalled();
  });

  it('should not render the search bar when activeSearch is false', () => {
    component.activeSearch = false;
    fixture.detectChanges();

    const searchBar = fixture.debugElement.query(By.directive(SearchBarComponent));
    expect(searchBar).toBeNull();
  });
});