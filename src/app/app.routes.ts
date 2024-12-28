import { Routes } from '@angular/router';

import { ListComponent } from "./domains/products/pages/list/list.component";
import { LayoutComponent } from "@shared/components/layout/layout.component";
import { AboutComponent } from "./domains/info/pages/about/about.component";
import { NotFoundComponent } from "./domains/info/pages/not-found/not-found.component";
export const routes: Routes = [
    {//esto es para generar vistas anidadass (componentes compartidos), se va a mostrar el layoutcomponent en cada elemento que tenga como hijo, y no tener que ponerlo uno por uno
        path:'',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: ListComponent
            },
            {
                path: 'about',
                component: AboutComponent
            }
        ]
    },
    {
        path: '**',//este debe ir al final y tiene que nener ** para que sirva como notFound
        component: NotFoundComponent
    }
];
