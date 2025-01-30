
import { Subject } from 'rxjs';

export class CounterIntent {
  constructor() {
    this.increment$ = new Subject();
    this.decrement$ = new Subject();
    this.reset$ = new Subject();
  }

  increment() {
    this.increment$.next();
  }

  decrement() {
    this.decrement$.next();
  }

  reset() {
    this.reset$.next();
  }
}

