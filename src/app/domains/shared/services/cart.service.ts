import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { Carrito } from '@shared/models/carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Carrito[]>([]);
  total = computed(()=>{
    const cart = this.cart();
    return cart.reduce((total, product)=> total + (product.producto.price * product.cantidad), 0);
  })
  constructor() { }

  quantityOfProducts = computed(()=>{
    const cart = this.cart();
    return cart.reduce((quantity, product)=> quantity + product.cantidad, 0);
  })

  addToCart(product: Product) {
    this.cart.update(cartState => {
      let yaExistente = false;
      
      const newCart = cartState.map(item => {
        if (item.producto.id === product.id) {
          yaExistente = true;
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });
  
      if (!yaExistente) {
        newCart.push({ producto: product, cantidad: 1 });
      }
  
      return newCart;
    });
  }
  
  deleteToCart(product: Product) {
    this.cart.update(cartState => {
      const newCart = cartState
        .map(item => {
          if (item.producto.id === product.id) {
            if (item.cantidad > 1) {
              return { ...item, cantidad: item.cantidad - 1 };
            } else {
              return null; // Marcar para eliminar
            }
          }
          return item;
        })
        .filter(item => item !== null) as Carrito[];
  
      return newCart; 
    });
  }
  
}
