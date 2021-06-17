import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, merge, Observable, Subscription, timer } from 'rxjs';
import { filter, map, share, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    // this.rxjsDemo();
  }

  rxjsDemo(): void {
    this.timer$ = timer(0, 2000).pipe(
      // tap(num => console.log('Observable processing')),
      // share()
    );
    // this.subscription = this.timer$.subscribe(console.log);
    const interval$ = interval(1000);

    merge(
      this.timer$.pipe(
        map(num => num * 10),
        map(num => ({
          type: 'stream timer',
          value: num
        }))
      ),
      interval$.pipe(
        map(num => ({
          type: 'stream interval',
          value: num
        }))
      )
    ).pipe(
      // filter(state => state.type === 'stream timer'),
      map(state => state.value)
    ).subscribe(console.log);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
