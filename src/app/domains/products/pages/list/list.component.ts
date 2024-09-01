import { Component, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./../../components/product/product.component";
import { Product } from "./../../../shared/models/product.model";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([])//le indicamos que es una señal y que esa señal va a tener un interface, indicamos que Product es una lista y le damos como estado inicial un array vacío; tambien se podrían colocar de forma directa en este array

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
        title: 'product 1',
        price: 100,
        image: 'https://picsum.photos/640/640?r=24',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'product 2',
        price: 100,
        image: 'https://picsum.photos/640/640?r=25',
        creationAt: new Date().toISOString()
      }
    ];
    this.products.set(initProducts);
  }
  fromChild(event: string){
    console.log('estamos en el padre');
    console.log(event);
  }
}
