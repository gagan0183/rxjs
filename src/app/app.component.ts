import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

    this.subject$ = new BehaviorSubject(200);
    this.subject$.subscribe(x => console.log('first subscribe ', x));
    this.subject$.next(1);
    this.subject$.next(9);

    this.subject$.subscribe(x => console.log('second subscribe ', x));
    this.subject$.next(90);
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
  }
}
