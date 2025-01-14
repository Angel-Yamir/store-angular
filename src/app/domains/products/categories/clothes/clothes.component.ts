import { Component, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-clothes',
  standalone: true,
  imports: [],
  templateUrl: './clothes.component.html',
  styleUrl: './clothes.component.css'
})
export default class ClothesComponent {
  private productService = inject(ProductService);
  generalProducts=signal<Product[]>([]);
  productsCategories = signal<Product[]>([]);
  private getProducts(){
    this.productService.getProducts()//enviamos a category_id en caso de que sufra alguna modificacion(puede que se ejecute esta funcin pero no se envia practicamente nada en category_id)
    .subscribe({
      next: (products) =>{
        const productosReducidos=[];
        for(let i=0; i<4; i++){
          const random = 
        }
        this.productsCategories.set(productosReducidos);
      },
      error: ()=>{

      }
    })
  }
}
