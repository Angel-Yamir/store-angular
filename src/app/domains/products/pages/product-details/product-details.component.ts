// este es el componente que que se muestra cuando se dan los detalles del componente


import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CommonModule } from "@angular/common";
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {      
  //para que los parametros de las rutas puedan llegar como inputs hay que hacer una configuracion en el app.config.ts
  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal('');//indicamos que es de tipo string y esta en vacio por defecto
  private productSercive = inject(ProductService);
  private cartService = inject(CartService);

  // ya que accedimos por medio de la imagen (desde list) de un producto a los detalles de este por medio del @Input traemos al id, de esa forma podemos por medio del ngOnInit (que se ejecuta al iniciar la aplacion) traemos por medio del prodcut service la informacion de ese producto 
  ngOnInit(){
    if(this.id){
      this.productSercive.getOne(this.id)
      .subscribe({
        next: (product)=>{
          this.product.set(product);
          if(product.images.length > 0){
            this.cover.set(product.images[0]);
          }
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
}
