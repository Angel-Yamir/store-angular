import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
//import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //ya no se necesita este input por la actualizacion de inyeccion de dependencias, tampoco el precioTotalAPagar
  //@Input({required: true}) cart: Product[] = [];
  hideSideMenu = signal(true);
  //precioTotalAPagar=signal(0);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  precioTotalAPagar = this.cartService.total;
  toogleSideMenu(){//para mostra y no mostrar el carrito de compras
    this.hideSideMenu.update(prevState => !prevState);
  }

  //ya no se necesitan ngOnChange y calcular total debido a la logica del programa, ya que sus usos fueron remplazados por la actualizacion de inyeccion de dependancias para solucionar el prop drilling
/*
  ngOnChanges(changes: SimpleChanges){
    const change = changes['cart'];
    if (change) {
      this.precioTotalAPagar.set(this.calcularTotal());
    }
  }  

  calcularTotal(){
    return this.cart.reduce((total, product) => total + product.price, 0);
  }*/
}
