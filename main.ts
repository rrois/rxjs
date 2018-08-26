import { delay, flatMap, retry, retryWhen, scan, takeWhile, catchError } from 'rxjs/operators';
import { Observable, fromEvent, defer, of, from, merge, onErrorResumeNext, throwError } from 'rxjs';
import { load, loadWithFetch } from './loader';

// let source = Observable.create(observer =>{
//     observer.next(1);
//     observer.next(2);
//     observer.error('ERROR!'); // throw new Error('ERROR!');
//     observer.next(3);
//     observer.complete();
// });

// let source = onErrorResumeNext(
//     of(1),
//     from([2, 3, 4]),
//     throwError(new Error('Stop!')),
//     of(5)
// ).pipe(
//     catchError(e => {
//         console.log(`caught: ${e}`);
//         return of(10);
//     })
// );

let source = merge(
    of(1),
    from([2, 3, 4]),
    throwError(new Error('Stop!')),
    of(5)
).pipe(
    catchError(e => {
        console.log(`caught: ${e}`);
        return of(10);
    })
);

source.subscribe(
    value => console.log(`value: ${value}`),
    error => console.log(`error: ${error}`),
    () => console.log(`Complete!`)
);

// let output = document.getElementById('output');
// let button = document.getElementById('button');

// let click: Observable<any> = fromEvent(button, 'click');

// let renderMovies = function(movies) {
//   movies.forEach(m => {
//     let div = document.createElement('div');
//     div.innerText = m.title;
//     output.appendChild(div);
//   });
// };

// loadWithFetch('movies.json');

// click
//   .pipe(flatMap(e => loadWithFetch('movies.json')))
//   .subscribe(renderMovies, error => console.log(`error: ${error}`), () => console.log(`Complete!`));
