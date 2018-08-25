import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

let numbers = [1,2,3,4,5];
let source: Observable<number> = Observable.create(observer => {
    
    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);
        if(index < numbers.length){
            setTimeout(produceValue, 2000);
        } else {
            observer.complete();
        }
    };

    produceValue();

});


source.pipe(
    map(n => n*2),
    filter(n => n > 4)
).subscribe(
    value => console.log(`Next value in stream: ${value}`),
    error => console.log(`error: ${error}`),
    () => console.log(`Complete!`)
);