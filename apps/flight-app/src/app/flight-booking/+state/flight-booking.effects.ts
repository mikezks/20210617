import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-lib';



@Injectable()
export class FlightBookingEffects {

  loadFlightBookings$ = createEffect(() => this.actions$.pipe(
    ofType(FlightBookingActions.flightsLoad),
    switchMap(action => this.flightService.find(
        action.from,
        action.to
      ).pipe(
        map(flights => FlightBookingActions.flightsLoaded({ flights })),
        catchError(err => of(FlightBookingActions.flightsLoadedFailure({ error: err })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}

}
