import { map } from 'rxjs/internal/operators/Map';
import { filter } from 'rxjs/internal/operators/Filter';
import { delay, flatMap, retry, retryWhen, scan, takeWhile } from 'rxjs/operators';
import { Observable,  fromEvent, defer } from 'rxjs';

import { fromPromise } from 'rxjs/internal/observable/fromPromise';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click: Observable<any> = fromEvent(button, 'click');

let load = function(url: string) {
 return Observable.create(observer =>{
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        if(xhr.status === 200){
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        } else {
            observer.error(xhr.statusText);
        }
    });
  
    xhr.open('GET', url);
    xhr.send();
 }).pipe(
     retryWhen(retryStrategy({attempts: 3, delay: 1500}))
 );
};

function loadWithFech(url: string) {
    return defer(() => {
        return fromPromise(fetch(url).then( r => r.json()));
    });
}

let retryStrategy = function ({attempts = 4, delay: number = 1000}) {
    return function(errors: Observable<any>){
        return errors.pipe(
            scan((accumulator, value) =>{
                console.log(accumulator, value);
                return accumulator +1;
            }, 0),
            takeWhile(accumulator => accumulator < 4),
            delay(1000)
        );
    }

};
let renderMovies = function(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
      });
}

loadWithFech("movies.json");

click.pipe(
    flatMap(e => loadWithFech("movies.json"))
).subscribe(
    renderMovies,
    error => console.log(`error: ${error}`),
    () => console.log(`Complete!`)
);
