const Rx = require("rxjs");

/**
 * of
 * Emit variable amount of values in a sequence.
 */
console.log("------------- of -------------");

{
  const source    = Rx.Observable.of(1, 2, 3, 4, 5);
  const subscribe = source.subscribe(value => console.log(value));
}

{
  const source    = Rx.Observable.of(1, "mitz", [1, 2, 3], { name: "mitz" }, () => console.log("Hello"));
  const subscribe = source.subscribe(value => console.log(value));
}

/**
 * from
 * Turn an array, promise, or iterable into an observable.
 */
console.log("------------- from -------------");

{
  const source    = Rx.Observable.from([1, 2, 3, 4, 5]);
  const subscribe = source.subscribe(value => console.log(value));
}

{
  const source    = Rx.Observable.from(new Promise(resolve => resolve("Hello promise")));
  const subscribe = source.subscribe(value => console.log(value));
}

