import { Routes } from '@angular/router';

//import { ListComponent } from "./domains/products/pages/list/list.component";
import { ProductDetailsComponent } from "@products/pages/product-details/product-details.component";
import { LayoutComponent } from "@shared/components/layout/layout.component";
//import { AboutComponent } from "./domains/info/pages/about/about.component";
//import { NotFoundComponent } from "./domains/info/pages/not-found/not-found.component";
export const routes: Routes = [
    {//esto es para generar vistas anidadass (componentes compartidos), se va a mostrar el layoutcomponent en cada elemento que tenga como hijo, y no tener que ponerlo uno por uno
        path:'',
        component: LayoutComponent,
        children: [
            /*{
                path: '',
                component: ListComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'product/:id',
                component: ProductDetailsComponent
            }*/
            {
                path: '',
                loadComponent: ()=> import('./domains/products/pages/list/list.component')
            },
            {
                path: 'about',
                loadComponent: ()=> import('./domains/info/pages/about/about.component')
            },
            {
                path: 'clothes',
                loadComponent: ()=> import('./domains/products/categories/clothes/clothes.component')
            },
            {
                path: 'electronics',
                loadComponent: ()=> import('./domains/products/categories/electronics/electronics.component')
            },
            {
                path: 'miscellaneous',
                loadComponent: ()=> import('./domains/products/categories/miscellaneous/miscellaneous.component')
            },
            {
                path: 'shoes',
                loadComponent: ()=> import('./domains/products/categories/shoes/shoes.component')
            },
            {
                path: 'product/:id',
                component: ProductDetailsComponent
            },
            {
                path: 'shopping-cart',
                loadComponent: ()=> import('./domains/products/pages/shopping-cart/shopping-cart.component')
            },
        ]
    },
    {
        path: '**',//este debe ir al final y tiene que nener ** para que sirva como notFound
        loadComponent: ()=> import('./domains/info/pages/not-found/not-found.component')
    }
];
