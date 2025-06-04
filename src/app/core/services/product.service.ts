import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Import environment to read the base URL
import { environment } from '../../../environments/environment';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /**
   * Base URL for the product-related API endpoints.
   * We use `environment.apiBaseUrl` para que en producción
   * Angular reemplace la ruta automáticamente.
   */
  private baseUrl = `${environment.apiBaseUrl}/bp/products`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all products from the server.
   * GET {apiBaseUrl}/bp/products
   */
  getAll(): Observable<{ data: Product[] }> {
    return this.http.get<{ data: Product[] }>(this.baseUrl);
  }

  /**
   * Searches products by a query string.
   * Example: GET {apiBaseUrl}/bp/products?q=someTerm
   * If the backend does not support query param, you can filter on the frontend.
   */
  search(query: string): Observable<{ data: Product[] }> {
    return this.http.get<{ data: Product[] }>(`${this.baseUrl}?q=${encodeURIComponent(query)}`);
  }

  /**
   * Retrieves a single product by its ID.
   * GET {apiBaseUrl}/bp/products/{id}
   */
  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }

  /**
   * Creates a new product in the backend.
   * POST {apiBaseUrl}/bp/products
   * Body: { ...product }
   */
  create(product: Product): Observable<{ data: Product }> {
    return this.http.post<{ data: Product }>(this.baseUrl, product);
  }

  /**
   * Updates an existing product partially.
   * PUT {apiBaseUrl}/bp/products/{id}
   * Body: { ...changes }
   */
  update(id: string, changes: Partial<Product>): Observable<{ data: Product }> {
    return this.http.put<{ data: Product }>(`${this.baseUrl}/${encodeURIComponent(id)}`, changes);
  }

  /**
   * Deletes a product by its ID.
   * DELETE {apiBaseUrl}/bp/products/{id}
   */
  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }

  /**
   * Checks if a product ID already exists.
   * GET {apiBaseUrl}/bp/products/verification/{id}
   * Returns true if exists, false otherwise.
   */
  exists(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verification/${encodeURIComponent(id)}`);
  }
}
