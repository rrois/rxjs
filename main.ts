import { Observable, Observer, from } from 'rxjs';

let numbers = [1,2,3];
let source = from(numbers);

class MyObserver implements Observer<number>{
    next(value) {
        console.log(`Next value in stream: ${value}`);
    }

    error(e) {
        console.log(`error: ${e}`);
    }

    complete() {
        console.log(`Complete!`);
    }
}

source.subscribe(
    res => console.log(res)
);

source.subscribe(new MyObserver());