import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product, ProductBody, SearchProductFilter } from '../../shared/models/product';
import { environment } from '../../../environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importe o HttpClientTestingModule para simular chamadas HTTP
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições HTTP pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products without filter', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Desc 1', price: 100, category: 'Category 1', featured: false, createdAt: new Date() },
    ];

    service.fetchProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // Simula a resposta da requisição
  });

  it('should create a product', () => {
    const mockProductBody: ProductBody = { name: 'New Product', description: 'New Desc', price: 200, category: 'New Category', featured: true, createdAt: new Date() };
    const mockProduct: Product = { id: '1', ...mockProductBody, createdAt: new Date() };

    service.createProduct(mockProductBody).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProductBody);
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    const mockProductBody: ProductBody = { name: 'Updated Product', description: 'Updated Desc', price: 300, category: 'Updated Category', featured: true, createdAt: new Date() };
    const mockProduct: Product = { id: '1', ...mockProductBody, createdAt: new Date() };

    service.updateProduct('1', mockProductBody).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProductBody);
    req.flush(mockProduct);
  });

  it('should delete a product', () => {
    service.deleteProduct('1').subscribe((response) => {
      expect(response).toBeUndefined(); // A resposta de delete é void
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simula uma resposta vazia
  });
});