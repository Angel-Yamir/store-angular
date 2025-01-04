import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLinkWithHref } from "@angular/router";
import { ProductComponent } from "./../../components/product/product.component";
import { Product } from "@shared/models/product.model";
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);//le indicamos que es una señal y que esa señal va a tener un interface, indicamos que Product es una lista y le damos como estado inicial un array vacío; tambien se podrían colocar de forma directa en este array
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;//debe tener el mismo nobre que tiene el queryParams, de lo contrario no se detectan

  ngOnInit(){
    //this.getProducts();  aquí ya no lo ponemos porque de igual forma se ejecuta una vez al cargar con ngOnChanges
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges){
    const category_id = changes['category_id'];
    if(category_id){//se ejecuta solo cuando category_id tiene algún cambio
      this.getProducts()
    }
  }
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
  addToCart(product: Product){
    this.cartService.addToCart(product);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)//enviamos a category_id en caso de que sufra alguna modificacion(puede que se ejecute esta funcin pero no se envia practicamente nada en category_id)
    .subscribe({
      next: (products) =>{
        this.products.set(products);
      },
      error: ()=>{

      }
    })
  }

  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (data) =>{
        this.categories.set(data);
      },
      error: ()=>{

      }
    })
  }
}
