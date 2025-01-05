import { Component, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CounterComponent } from "@shared/components/counter/counter.component";
import { HeaderComponent } from "@shared/components/header/header.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CounterComponent, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
//se agrega el dafault para indicar que automaticamente tiene que resolvero(exportar este componente) y así nos ahorramos el .then (en la tecnica de lazyLoading)
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hola');

  changeDuration(event: Event){
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber)
  }
  changeMessage(event: Event){
    const input = event.target as HTMLInputElement;
    this.message.set(input.value)
  }
}
