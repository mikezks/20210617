import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { iif, interval, merge, Observable, of, Subscription, timer } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, share, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  subscription: Subscription;

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.rxjsDemo();

    // Stream 4: Flights result stream
    this.flights$ =
      // Stream 1: ValueChanges of Input
      // Trigger: User enters city name
      // Data Provider: City filter value
      this.control.valueChanges.pipe(
        // Filter START
        debounceTime(300),
        distinctUntilChanged(),
        // Filter END
        switchMap(city =>
          iif(
            () => city.length > 2,
            // Stream 2: Http call
            of(city).pipe(
              // Side-effect: Assigns a class property
              tap(_ => this.loading = true),
              // Add stream: SwitchMap -> Source triggers, referenced stream is started
              switchMap(city => this.load(city)),
              delay(1000),
              // Side-effect: Assigns a class property
              tap(_ => this.loading = false)
            ),
            // Stream 3: Empty result array
            of([])
          )
        )
      );
  }

  // Stream 2: Http get request -> response
  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
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
