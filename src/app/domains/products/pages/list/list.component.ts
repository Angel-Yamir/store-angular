import { Component, inject, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./../../components/product/product.component";
import { HeaderComponent } from "./../../../shared/components/header/header.component";
import { Product } from "./../../../shared/models/product.model";
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);//le indicamos que es una señal y que esa señal va a tener un interface, indicamos que Product es una lista y le damos como estado inicial un array vacío; tambien se podrían colocar de forma directa en este array

  private cartService = inject(CartService);
  private productService = inject(ProductService)
  //ya no necesitamos el constructor en esta caso porque ahora los datos los estamos trayendo de una API
  /*
  constructor(){
    const initProducts: Product[] = [
      {
        id: Date.now(),
        title: 'product 1',
        price: 100,
        image: 'https://picsum.photos/640/640?r=23',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'product 2',
        price: 100,
        image: 'https://picsum.photos/640/640?r=24',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'product 3',
        price: 100,
        image: 'https://picsum.photos/640/640?r=26',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'product 2',
        price: 100,
        image: 'https://picsum.photos/640/640?r=27',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'product 3',
        price: 100,
        image: 'https://picsum.photos/640/640?r=28',
        creationAt: new Date().toISOString()
      }
    ];
    this.products.set(initProducts);
  }
  */
  fromChild(product: Product){
    console.log("este es un log")
    this.cartService.addToCart(product)
  }
}
