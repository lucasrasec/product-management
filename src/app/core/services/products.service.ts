import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductBody, SearchProductFilter } from '../../shared/models/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchProducts(filter?: SearchProductFilter): Observable<Product[]> {
    let params = new HttpParams();

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          value.forEach((element: string) => {
            params = params.append(`${key}_like`, element);
          });
        }
      });
    }

    return this.http.get<Product[]>(`${this.url}/products`, { params })
  }

  createProduct(body: ProductBody): Observable<Product> {
    return this.http.post<Product>(`${this.url}/products`, body);
  }

  updateProduct(id: string, product: ProductBody): Observable<Product> {
    return this.http.put<Product>(`${this.url}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/products/${id}`);
  }
}
