import { Component, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductComponent } from "@products/components/product/product.component";
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [ProductComponent],
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
    this.productService.getCategory("electronics")//enviamos a category_id en caso de que sufra alguna modificacion(puede que se ejecute esta funcin pero no se envia practicamente nada en category_id)
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
    /*
      Lo que hace esta funcion es traer los productos de la categoría correspondiente mientras que estos tengan un precio menor al promedio. traera por defecto solo 8 productos pero si no hay suficientes que cumplan la condicion no será necesario que se sigan trayendo otros
    */
    //primero obtengo el promedio
    const selectedProducts=[];
    const products = this.productsCategories();
    const addition = products.reduce((total, product)=> total + product.price, 0);
    const average = addition/products.length;
    //realizo el filtado
    for(let product of products){
      if(selectedProducts.length < 8){
        selectedProducts.push(product);
      }
    }
    this.productsByPrice.set(selectedProducts);
    console.log("este es el tamaño 2: ", this.productsByPrice.length);
  }  
  
}
