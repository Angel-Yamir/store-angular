import { Component, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLinkWithHref } from "@angular/router";
import { EventEmitter } from '@angular/core';
import { Product } from "@shared/models/product.model";
import { TimeAgoPipe } from "@shared/pipes/time-ago.pipe";

@Component({
  selector: 'app-selected-product',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './selected-product.component.html',
  styleUrl: './selected-product.component.css'
})
export class SelectedProductComponent {
  //@Input({required: true}) img: string = '';
  //@Input({required: true}) price: number = 0;
  //@Input({required: true}) title: string = '';
  //originalmente coloqué tres inputs, uno para cada atributo de product, pero como en el padre no quiero estar enviando atributo por atributo, remplacé los tres inputs por uno solo en el cual se va a enviar todo el objeto, por lo tanto tambien cada atributo de el.
  @Input({required: true}) product!: Product;//se coloca el ! porque si no marca que no está inicializada, pero nos aseguramos de su funcionamineto con el required true

}

