import { Component, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLinkWithHref } from "@angular/router";
import { EventEmitter } from '@angular/core';
import { Product } from "@shared/models/product.model";
import { TimeAgoPipe } from "@shared/pipes/time-ago.pipe";
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-filtered-product',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './filtered-product.component.html',
  styleUrl: './filtered-product.component.css'
})
export class FilteredProductComponent {
  @Input({required: true}) product!: Product;//se coloca el ! porque si no marca que no está inicializada, pero nos aseguramos de su funcionamineto con el required true
  
  @Output() addToCart = new EventEmitter();

  addToCartHandler(){
    this.addToCart.emit(this.product);
  }
}
