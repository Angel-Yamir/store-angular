import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';

  counter = signal(0);
  counterRef: number | undefined
  
  constructor(){
    // BEFORE RENDER
    // el constructor se usa para crear valores de forma directa y no debe ser asíncrono
    console.log('constructor')
  }
  ngOnChanges(changes: SimpleChanges){
    // BEFORE AND DURING RENDER
    // ocurre en cada cambio y por lo tanto podemos saber cuales son por medio de simplechange
    console.log('ngOnChanges')
    console.log(changes)
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSometing();
    }
    console.log("change duration: ", this.duration)
    console.log("change message: ", this.message)
  }
  ngOnInit(){
    // AFTER  RENDER
    // se ejecuta una vez
    console.log('onOnInit');
    console.log('duration => ', this.duration)
    console.log('message => ', this.message)
    /*if (typeof window !== 'undefined') {
      window.setInterval(() => {
        console.log("set interval");
        this.counter.update(statePrev => statePrev + 1);
      }, 1000);
    }*/
  }
  ngAfterViewInit(){
    // AFTER RENDER
    // para preguntar si los hijos de este componente ya fueron renderizados
    console.log('ngAfterViewInit')
    this.counterRef = window.setInterval(()=>{
      console.log('run interval')
      this.counter.update(statePrev => statePrev +1)
    }, 1000)
  }
  ngOnDestroy(){
    console.log('ngOnDestroy');
    if(typeof window !== 'undefined'){
      window.clearInterval(this.counterRef)
    }
  }
  doSometing(){
    console.log('change duration');
  }
}
