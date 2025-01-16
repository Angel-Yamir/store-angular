import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
}) 
export class ProductService {
  private http = inject(HttpClient);
  constructor() { }
  //lo que se está haciendo en getProducts es que tiene  la opcion de resibir como parametro un string que es llamado category_id y este string sí llega entonces el url se modifica agregandole este valor, de lo contrario se mantiene igual y se retorna
  getProducts(category_id?: string){
    const url = new URL(`https://api.escuelajs.co/api/v1/products`);
    if (category_id) {
      url.searchParams.set('categoryId', category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }
  getCategory(category_string: String){
    return this.http.get<Product[]>(`https://api.escuelajs.co/api/v1/categories/${category_string}`); 
  }

  getOne(id: String){
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
