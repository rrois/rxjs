import { map } from 'rxjs/internal/operators/Map';
import { filter } from 'rxjs/internal/operators/Filter';

import { delay } from 'rxjs/operators';


import { fromEvent } from 'rxjs';

let circle = document.getElementById('circle');

let source = fromEvent(document, 'mousemove')
    .pipe(
        map((e: MouseEvent) => {
            return {
                x: e.clientX,
                y: e.clientY
            }
        }),
        filter(value => value.x < 500),
        delay(500)
    );

let onNext = function(value){
    circle.style.left = value.x;
    circle.style.top = value.y;
};
source.subscribe(
    onNext,
    error => console.log(`error: ${error}`),
    () => console.log(`Complete!`));


