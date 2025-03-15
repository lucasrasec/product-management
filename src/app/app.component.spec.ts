import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductsService } from './core/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Product, ProductBody, SearchProductFilter } from './shared/models/product';
import { signal } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let productsServiceMock: jest.Mocked<ProductsService>;
  let snackBarMock: jest.Mocked<MatSnackBar>;

  beforeEach(() => {
    productsServiceMock = {
      fetchProducts: jest.fn().mockReturnValue(of([])),
      createProduct: jest.fn().mockReturnValue(of({})),
      updateProduct: jest.fn().mockReturnValue(of({})),
    } as any;

    snackBarMock = {
      open: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    });

    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Desc 1', price: 100, category: 'Category 1', featured: false, createdAt: new Date() },
    ];
    productsServiceMock.fetchProducts.mockReturnValue(of(mockProducts));

    component.ngOnInit();

    expect(productsServiceMock.fetchProducts).toHaveBeenCalled();
    expect(component.products()).toEqual(mockProducts);
  });

  it('should handle search products', () => {
    const mockFilter: SearchProductFilter = { name: ['Product 1'], category: ['Category 1'] };
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Desc 1', price: 100, category: 'Category 1', featured: false, createdAt: new Date() },
    ];
    productsServiceMock.fetchProducts.mockReturnValue(of(mockProducts));

    component.searchProducts(mockFilter);

    expect(component.currentFilter).toEqual(mockFilter);
    expect(productsServiceMock.fetchProducts).toHaveBeenCalledWith(mockFilter);
    expect(component.products()).toEqual(mockProducts);
  });

  it('should handle create product', () => {
    const mockProductBody: ProductBody = { name: 'New Product', description: 'New Desc', price: 200, category: 'New Category', featured: true, createdAt: new Date() };

    component.handleAction('create');
    component.handleFormEvent(mockProductBody);

    expect(productsServiceMock.createProduct).toHaveBeenCalledWith(mockProductBody);
    expect(snackBarMock.open).toHaveBeenCalledWith('Produto adicionado com sucesso!', 'Ok', { duration: 3000 });
  });

  it('should handle update product', () => {
    const mockProductBody: ProductBody = { name: 'Updated Product', description: 'Updated Desc', price: 300, category: 'Updated Category', featured: true, createdAt: new Date() };
    const mockProduct: Product = { id: '1', name: 'Product 1', description: 'Desc 1', price: 100, category: 'Category 1', featured: false, createdAt: new Date() };

    component.activeProduct = mockProduct;
    component.handleAction('update');
    component.handleFormEvent(mockProductBody);

    expect(productsServiceMock.updateProduct).toHaveBeenCalledWith(mockProduct.id, mockProductBody);
    expect(snackBarMock.open).toHaveBeenCalledWith('Produto adicionado com sucesso!', 'Ok', { duration: 3000 });
  });

  it('should handle form event with null data', () => {
    component.handleFormEvent(null);

    expect(component.productActionAtive()).toBe('');
  });

  it('should handle table event', () => {
    const mockProduct: Product = { id: '1', name: 'Product 1', description: 'Desc 1', price: 100, category: 'Category 1', featured: false, createdAt: new Date() };

    component.handleTableEvent(mockProduct);

    expect(component.activeProduct).toEqual(mockProduct);
    expect(component.productActionAtive()).toBe('update');
  });

  it('should handle error when loading products', () => {
    const errorMessage = 'Error loading products';
    productsServiceMock.fetchProducts.mockReturnValue(throwError(() => errorMessage));

    component.loadProducts();

    expect(productsServiceMock.fetchProducts).toHaveBeenCalled();
    expect(component.products()).toEqual([]);
  });
});