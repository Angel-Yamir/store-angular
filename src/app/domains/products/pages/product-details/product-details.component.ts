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
