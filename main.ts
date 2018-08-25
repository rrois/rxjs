import { map } from 'rxjs/internal/operators/Map';
import { filter } from 'rxjs/internal/operators/Filter';
import { delay } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = fromEvent(button, 'click');

let load = function(url: string) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    let movies = JSON.parse(xhr.responseText);
    movies.forEach(m => {
      let div = document.createElement('div');
      div.innerText = m.title;
      output.appendChild(div);
    });
  });

  xhr.open('GET', url);
  xhr.send();
};

click.subscribe(e => load('movies.json'), error => console.log(`error: ${error}`), () => console.log(`Complete!`));
