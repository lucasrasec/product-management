import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product, ProductBody, SearchProductFilter } from '../../shared/models/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   private readonly baseUrl = `${environment.apiUrl}/products`;
   private readonly http = inject(HttpClient);

  /**
   * Busca produtos com base em um filtro opcional.
   * @param filter - Filtro de busca (opcional).
   * @returns Observable com a lista de produtos.
   */
  fetchProducts(filter?: SearchProductFilter): Observable<Product[]> {
    const params = this.buildSearchParams(filter); 

    return this.http.get<Product[]>(this.baseUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

   /**
   * Cria um novo produto.
   * @param body - Dados do produto a ser criado.
   * @returns Observable com o produto criado.
   */
  createProduct(body: ProductBody): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, body).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Atualiza um produto existente.
   * @param id - ID do produto a ser atualizado.
   * @param product - Dados do produto atualizado.
   * @returns Observable com o produto atualizado.
   */
  updateProduct(id: string, product: ProductBody): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Product>(url, product).pipe(
      catchError(this.handleError) 
    );
  }

  /**
   * Exclui um produto.
   * @param id - ID do produto a ser excluído.
   * @returns Observable vazio.
   */
  deleteProduct(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError) 
    );
  }

  private buildSearchParams(filter?: SearchProductFilter): HttpParams {
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

    return params;
  }

  /**
   * Trata erros das requisições HTTP.
   * @param error - Erro capturado.
   * @returns Observable com o erro.
   */
  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Erro ao processar a requisição. Tente novamente mais tarde.'));
  }
}
