import { Component, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductComponent } from "@products/components/product/product.component";
import { FilteredProductComponent } from "./../../components/filtered-product/filtered-product.component";
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [ProductComponent, FilteredProductComponent],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.css'
})
export default class ElectronicsComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  productsByPrice=signal<Product[]>([]);
  productsCategories = signal<Product[]>([]);
  ngOnInit(){
    this.getByPrice();  
    this.getProductsCategory();  
  }
  addToCart(product: Product){
    this.cartService.addToCart(product);
  }
  private getProductsCategory(){
    this.productService.getProducts("2")//enviamos a category_id en caso de que sufra alguna modificacion(puede que se ejecute esta funcin pero no se envia practicamente nada en category_id)
    .subscribe({
      next: (products) =>{
        this.productsCategories.set(products);
        console.log("este es el tamaño 1: ", this.productsCategories.length);
      },
      error: ()=>{

      }
    })
  }  
  private getByPrice(){
    this.productService.getProducts("5")//enviamos a category_id en caso de que sufra alguna modificacion(puede que se ejecute esta funcin pero no se envia practicamente nada en category_id)
    .subscribe({
      next: (products) =>{
        const selectedProducts=[];
        const addition = products.reduce((total, product)=> total + product.price, 0);
        const average = addition/products.length;
        for(let product of products){
          if(selectedProducts.length < 8){
            if(product.price < average){
              selectedProducts.push(product);
              console.log("se agrego");
            }        
          }
         console.log("-------------", products.length);
        }
        this.productsByPrice.set(selectedProducts);
      },
      error: ()=>{

      }
    })
  } 
  
}
