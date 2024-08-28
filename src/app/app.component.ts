import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  // templateUrl: './app.component.html',
  template: '<router-outlet />',//lo que este router outlet hace es que da logica para la direccion de las paginas
  // originalmente habia una dirccion a app.component.html(con su css), pero como yo quiero que se redirija a otra parte lo quité y pese el router outled para especificar la ruta 
})
export class AppComponent {
  title = 'store';
}
