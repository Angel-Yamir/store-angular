import { Component, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { ProductComponent } from "./../../components/product/product.component";
import { CartService } from "@shared/services/cart.service";

@Component({
  selector: 'app-clothes',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './clothes.component.html',
  styleUrl: './clothes.component.css'
})
export default class ClothesComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  generalProducts=signal<Product[]>([]);
  productsCategories = signal<Product[]>([]);
  ngOnInit(){
    this.getgeneralProducts();
    this.getProductsCategory();
  }
  addToCart(product: Product){
    this.cartService.addToCart(product);
  }
  private getgeneralProducts(){
    this.productService.getProducts()//enviamos a category_id en caso de que sufra alguna modificacion(puede que se ejecute esta funcin pero no se envia practicamente nada en category_id)
    .subscribe({
      next: (products) =>{
        /* Lo que se hace aquí es que los datos se van a traer pero de forma controlada. antes de ser agregados a selectedProducts estos seran datos obtenidos por su id de forma aleatoria, estos solo seran cuatro y se emplea una logica para asegurarse de que no se agregue ningun dato repetido*/
        let selectedProducts = [];//acumulador de resultados finales
        const acumuladorRandoms:number[] = [];
        while(acumuladorRandoms.length < 8){
          let random = Math.floor(Math.random() * (products.length - 1 + 1)) + 1;
          if(!acumuladorRandoms.includes(random)){
            acumuladorRandoms.push(random);
          }
        }
        for(let randomId of acumuladorRandoms){
          selectedProducts.push(products[randomId]);//se selecciona este producto de esta forma ya que estamos tomando un numero alaetorio de la lista(no del id de cada elemento, si no de la enumeracion de la lista)
        }
        this.productsCategories.set(selectedProducts);
        
      },
      error: ()=>{

      }
    })
  }  
  private getProductsCategory(){
    this.productService.getCategory("clothes")//enviamos a category_id en caso de que sufra alguna modificacion(puede que se ejecute esta funcin pero no se envia practicamente nada en category_id)
    .subscribe({
      next: (products) =>{
        this.productsCategories.set(products);
      },
      error: ()=>{

      }
    })
  }  
}
