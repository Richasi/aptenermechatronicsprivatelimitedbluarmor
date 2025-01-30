// src/model/CounterModel.js
import { BehaviorSubject, interval, merge } from 'rxjs';
import { map, scan, startWith, switchMap } from 'rxjs/operators';

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
        : []
    )
  )
).pipe(
  startWith(0),
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
