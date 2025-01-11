import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CommonModule } from "@angular/common";
import { CartService } from '@shared/services/cart.service';
import { ProductComponent } from "../../components/product/product.component";
import { SelectedProductComponent } from "../../components/selected-product/selected-product.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ProductComponent, SelectedProductComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {  
  //para que los parametros de las rutas puedan llegar como inputs hay que hacer una configuracion en el app.config.ts
  @Input() id?: string;
  productsSelect = signal<Product[]>([])
  categoria = signal("");
  product = signal<Product | null>(null);
  cover = signal('');//indicamos que es de tipo string y esta en vacio por defecto
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(){
    if(this.id){
      this.productService.getOne(this.id)
      .subscribe({
        next: (product)=>{
          this.product.set(product);
          if(product.images.length > 0){
            this.cover.set(product.images[0]);
          }
          this.categoria.set(product.category.id.toString());//aquí obtengo el id de la categoria de el producto mostrado
          this.getSelectedProducts();//se está ejecutando getProducts dentro del suscribe porque aunque lo hagamos dentro del init si lo hacemos fuera del suscribe como suscribe es asincrono, mientras que el código de ngOnInit sigue ejecutándose de forma secuencial. lo que significa que se ejecutaria getProducts antes de que se le asigne a categoria su valor
        }
      })
    }
    
  }
  changeCover(newImg: string){
    this.cover.set(newImg);
  }

  addToCart(){//agregar al corrito de compras, si el producto no es nulo, se hace esta validacion porque this.product puede ser nulo
    const product = this.product();
    if(product){
      this.cartService.addToCart(product);
    }    
  }

  private getSelectedProducts(){
    this.productService.getProducts(this.categoria())//enviamos a category_id en caso de que sufra alguna modificacion(puede que se ejecute esta funcin pero no se envia practicamente nada en category_id)
    .subscribe({
      next: (products) =>{
        /* LO que se hace aquí es que los datos se van a traer pero de forma controlada. antes de ser agregados a selectedProducts estos seran datos obtenidos por su id de forma aleatoria, estos solo seran cuatro y se emplea una logica para asegurarse de que no se agregue ningun dato repetido*/
        let selectedProducts = [];//acumulador de resultados finales
        const acumuladorRandoms:number[] = [];
        while(acumuladorRandoms.length < 4){
          let random = Math.floor(Math.random() * (products.length - 1 + 1)) + 1;
          if(!acumuladorRandoms.includes(random)){
            acumuladorRandoms.push(random);
          }
        }
        for(let randomId of acumuladorRandoms){
          selectedProducts.push(products[randomId]);
        }
        this.productsSelect.set(selectedProducts);
        
      },
      error: ()=>{

      }
    })
  }  
}
