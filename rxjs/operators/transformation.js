const Rx = require("rxjs");

/**
 * map
 * Apply projection with each value from source.
 */
console.log("------------- map -------------");

{
  const source    = Rx.Observable.from([1, 2, 3, 4, 5]);
  const example   = source.pipe(Rx.operators.map(value => value + 10));
  const subscribe = example.subscribe(val => console.log(val));
}

/**
 * concatMap
 * Map values to inner observable, subscribe and emit in order.
 */
console.log("------------- concatMap -------------");

{
  const source    = Rx.Observable.of(1000, 2000);
  const example   = source.pipe(
    Rx.operators.concatMap(value =>
      Rx.Observable.of(console.log(`Delayed by: ${value}ms`))
        .pipe(Rx.operators.delay(value))
    ),
  );
  const subscribe = example.subscribe(val => console.log(val));
}

/**
 * switchMap
 * Map to observable, complete previous inner observable, emit values.
 */
console.log("------------- switchMap -------------");

{
  const source = Rx.Observable.timer(1, 5000);
  const example = source.pipe(Rx.operators.switchMap(() => Rx.Observable.interval(500)));
  const subscribe = example.subscribe(val => console.log(val));
}