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
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
  }
}
