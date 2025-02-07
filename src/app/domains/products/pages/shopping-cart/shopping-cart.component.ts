import { Component, EventEmitter, inject, Output, signal, SimpleChanges } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { CommonModule } from "@angular/common";
import { RouterLinkWithHref } from "@angular/router";
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export default class ShoppingCartComponent {
  private cartService = inject(CartService);
  cart = this.cartService.cart;

  precioTotalAPagar = this.cartService.total;
  quantityOfProducts = this.cartService.quantityOfProducts;
  ngOnInit(){
    console.log("inicio")
  }
  ngOnChanges(changes: SimpleChanges){
    console.log("cambio");
    console.log(changes);
  }
  
  addToCartHandler(product: Product){
    this.cartService.addToCart(product);
  }
  deleteToCartHandler(product: Product){
    this.cartService.deleteToCart(product);
  }
  ngOnDestroy(){
    console.log("destruido");
  }
}
