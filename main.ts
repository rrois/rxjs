import { delay, flatMap, retry, retryWhen, scan, takeWhile, catchError } from 'rxjs/operators';
import { Observable, fromEvent, defer, of, from, merge, onErrorResumeNext, throwError } from 'rxjs';
import { load, loadWithFetch } from './loader';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click: Observable<any> = fromEvent(button, 'click');

let renderMovies = function(movies) {
  movies.forEach(m => {
    let div = document.createElement('div');
    div.innerText = m.title;
    output.appendChild(div);
  });
};

loadWithFetch('moviess.json').subscribe( 
    renderMovies,
    e => console.log(`error: ${e}`),
    () => console.log('complete!')
);

click
  .pipe(flatMap(e => loadWithFetch('movies.json')))
  .subscribe(renderMovies, error => console.log(`error: ${error}`), () => console.log(`Complete!`));
