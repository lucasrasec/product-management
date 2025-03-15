import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { ProductsService } from '../../../core/services/products.service';
import { of } from 'rxjs';
import { Product } from '../../../shared/models/product';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsServiceMock: jest.Mocked<ProductsService>;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      category: 'Category 1',
      featured: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      category: 'Category 2',
      featured: true,
      createdAt: new Date('2023-01-02'),
    },
  ];

  beforeEach(async () => {
    productsServiceMock = {
      deleteProduct: jest.fn().mockReturnValue(of({})),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, MatTableModule, MatIconModule, MatTooltip, CurrencyPipe, DatePipe],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.products = mockProducts; // Define os produtos de entrada
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when updateAction is called', () => {
    jest.spyOn(component.emitAction, 'emit');

    component.updateAction(mockProducts[0]);

    expect(component.emitAction.emit).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should call deleteProduct and emit an event when deleteAction is called', () => {
    jest.spyOn(component.emitAction, 'emit');

    component.deleteAction(mockProducts[0]);

    expect(productsServiceMock.deleteProduct).toHaveBeenCalledWith(mockProducts[0].id);
    expect(component.emitAction.emit).toHaveBeenCalled();
  });
});