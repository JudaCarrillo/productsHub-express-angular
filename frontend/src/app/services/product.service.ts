import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http = inject(HttpClient);
  private urlBase!: string;
  private myApiUrl!: string;

  constructor() {
    this.urlBase = environment.apiUrl;
    this.myApiUrl = 'api/products/';
  }

  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.urlBase}${this.myApiUrl}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this._http.delete<void>(`${this.urlBase}${this.myApiUrl}${id}`);
  }

  createProduct(newProduct: Product): Observable<void> {
    return this._http.post<void>(`${this.urlBase}${this.myApiUrl}`, newProduct);
  }

  getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.urlBase}${this.myApiUrl}${id}`);
  }

  updateProduct(id: number, updateProduct: Product): Observable<void> {
    return this._http.put<void>(
      `${this.urlBase}${this.myApiUrl}${id}`,
      updateProduct
    );
  }
}
