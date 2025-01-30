import { BehaviorSubject, interval, merge, EMPTY } from 'rxjs';
import { map, scan, startWith, switchMap, tap } from 'rxjs/operators';

const count$ = new BehaviorSubject(0);
const autoIncrement$ = new BehaviorSubject(false);

const increment$ = new BehaviorSubject();
const decrement$ = new BehaviorSubject();
const reset$ = new BehaviorSubject();

const updateCount$ = merge(
  increment$.pipe(map(() => (count) => Math.min(count + 1, 98))),
  decrement$.pipe(map(() => (count) => Math.max(count - 1, 0))),
  reset$.pipe(map(() => () => 0)),
  autoIncrement$.pipe(
    switchMap((enabled) =>
      enabled
        ? interval(1100).pipe(map(() => (count) => Math.min(count + 1, 98)))
        : EMPTY // Emit nothing when auto-increment is disabled
    )
  )
).pipe(
  startWith((count) => count), // Start with an identity function
  tap((operation) => {
    if (typeof operation !== 'function') {
      console.error('Invalid operation:', operation); // Debugging output
    }
  }),
  scan((count, operation) => operation(count), 0)
);

export const CounterModel = {
  count$,
  increment$,
  decrement$,
  reset$,
  autoIncrement$,
  updateCount$
};
