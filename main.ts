import { Observable } from 'rxjs';

let numbers = [1,2,3];
let source = Observable.create(observer => {
    for(let n of numbers){
        if(n === 4) {
            observer.error('Observable error');
        }
        observer.next(n);
    }
    observer.complete();
});

source.subscribe(
    value => console.log(`Next value in stream: ${value}`),
    error => console.log(`error: ${error}`),
    () => console.log(`Complete!`)
);