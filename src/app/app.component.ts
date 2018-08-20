import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  
  observable$;
  subject$;

  ngOnInit() {
    this.observable$ = Observable.create((observer) => {
      observer.next(1);
      observer.next(9);
      observer.complete();
    });

    this.observable$.subscribe(
      value => console.log(value),
      err => {},
      () => console.log('this is the end there')
    );

    this.subject$ = new ReplaySubject();
    this.subject$.subscribe(x => console.log('first subscribe ', x));
    this.subject$.next(1);
    this.subject$.next(9);

    this.subject$.subscribe(x => console.log('second subscribe ', x));
    this.subject$.next(90);

    const numbers = Observable.interval(1000);

    numbers
    .take(10)
    .map(x => x * 9)
    .filter(x => x > 9)
    .subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
  }
}
