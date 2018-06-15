const Rx = require("rxjs");

/**
 * do / tap
 * Transparently perform actions or side-effects, such as logging.
 */
console.log("------------- do/tap -------------");

{
  const source  = Rx.Observable.of(1, 2, 3, 4, 5);
  const example = source.pipe(
    Rx.operators.tap(value => console.log(`before map: ${value}`)),
    Rx.operators.map(value => value + 10),
    Rx.operators.tap(value => console.log(`after map: ${value}`)),
  );

  const subscribe = example.subscribe(value => console.log(value));
}