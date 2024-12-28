import { Routes } from '@angular/router';

import { ListComponent } from "./domains/products/pages/list/list.component";
import { AboutComponent } from "./domains/info/pages/about/about.component";
import { NotFoundComponent } from "./domains/info/pages/not-found/not-found.component";
export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',//este debe ir al final y tiene que nener ** para que sirva como notFound
        component: NotFoundComponent
    }
];
