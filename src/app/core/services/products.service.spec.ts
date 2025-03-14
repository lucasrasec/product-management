import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product, ProductBody, SearchProductFilter } from '../../shared/models/product';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products without filters', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', price: 100, category: 'Category 1', featured: false,
      createdAt: new Date() },
      { id: '2', name: 'Product 2', description: 'Description 2', price: 200, category: 'Category 2', featured: true,
      createdAt: new Date() }
    ];

    service.fetchProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${service['url']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch products with filters', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', price: 100, category: 'Category 1', featured: false,
      createdAt: new Date() }
    ];
    const filters: SearchProductFilter = {
      name: ['Product 1'],
      category: ['Category 1']
    };

    service.fetchProducts(filters).subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${service['url']}?name_like=Product 1&category_like=Category 1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a product', () => {
    const newProduct: ProductBody = {
      name: 'New Product',
      description: 'New Description',
      price: 300,
      category: 'New Category',
      featured: true,
      createdAt: new Date()
    };
    const mockResponse: Product = { id: '3', ...newProduct };

    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['url']}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(mockResponse);
  });

  it('should update a product', () => {
    const updatedProduct: ProductBody = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 400,
      category: 'Updated Category',
      featured: false,
      createdAt: new Date()
    };
    const mockResponse: Product = { id: '1', ...updatedProduct };
    const productId = '1';

    service.updateProduct(productId, updatedProduct).subscribe((product) => {
      expect(product).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['url']}/${productId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(mockResponse);
  });

  it('should delete a product', () => {
    const productId = '1';

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['url']}/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle error on fetchProducts', () => {
    const filters: SearchProductFilter = {
      name: ['Product 1'],
      category: []
    };

    service.fetchProducts(filters).subscribe(
      () => fail('Expected an error, but got a successful response'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    const req = httpMock.expectOne(`${service['url']}?name_like=Product 1`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});