import { map } from 'rxjs/internal/operators/Map';
import { filter } from 'rxjs/internal/operators/Filter';
import { delay, flatMap } from 'rxjs/operators';
import { Observable,  fromEvent } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click: Observable<any> = fromEvent(button, 'click');

let load = function(url: string) {
 return Observable.create(observer =>{
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      let data = JSON.parse(xhr.responseText);
      observer.next(data);
      observer.complete();
    });
  
    xhr.open('GET', url);
    xhr.send();
 });
};

let renderMovies = function(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
      });
}

click.pipe(
    flatMap(e => load("movies.json"))
).subscribe(
    renderMovies,
    error => console.log(`error: ${error}`),
    () => console.log(`Complete!`)
);
