import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromPassenger from '../+state';

@Component({
  selector: 'flight-workspace-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  passengers$: Observable<fromPassenger.Passenger[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(
      fromPassenger.addPassengers({ passengers: [
        { id: 1, name: 'Max' },
        { id: 2, name: 'Susi' }
      ]})
    );

    this.passengers$ = this.store.select(
      fromPassenger.selectAll
    );
  }

}
