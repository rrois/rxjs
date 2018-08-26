import { Observable, defer } from './node_modules/rxjs';
import { retryWhen, scan, takeWhile, delay } from './node_modules/rxjs/operators';
import { fromPromise } from './node_modules/rxjs/internal/observable/fromPromise';

export function load(url: string) {
  return Observable.create(observer => {
    let xhr = new XMLHttpRequest();

    let onLoad = () => {
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          observer.next(data);
          observer.complete();
        } else {
          observer.error(xhr.statusText);
        }
      };
    xhr.addEventListener('load', onLoad);

    xhr.open('GET', url);
    xhr.send();

    return () => {
        console.log('cleanup');
        xhr.removeEventListener('load', onLoad);
        xhr.abort();
    };
  }).pipe(retryWhen(retryStrategy({ attempts: 3, delay: 1500 })));
}

export function loadWithFetch(url: string) {
  return defer(() => {
    return fromPromise(
      fetch(url).then(r => {
        if (r.status === 200) {
          return r.json();
        } else {
          return Promise.reject(r);
        }
      })
    );
  }).pipe(retryWhen(retryStrategy({ attempts: 3, delay: 1500 })));
}

export function retryStrategy({ attempts = 4, delay: number = 1000 }) {
  return function(errors: Observable<any>) {
    return errors.pipe(
      scan((accumulator, value) => {
        accumulator += 1;
        if(accumulator < attempts){
            return accumulator;
        } else {
            throw new Error(value + '');
        }
            console.log(accumulator, value);
        return accumulator + 1;
      }, 0),
      takeWhile(accumulator => accumulator < 4),
      delay(1000)
    );
  };
}
