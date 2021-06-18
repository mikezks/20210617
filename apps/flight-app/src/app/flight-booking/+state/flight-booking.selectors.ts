import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectFlights = createSelector(
  selectFlightBookingState,
  (state) => state.flights
);

export const selectPassengers = createSelector(
  selectFlightBookingState,
  (state) => state.passenger
);

export const selectBookings = createSelector(
  selectFlightBookingState,
  (state) => state.bookings
);

export const selectUser = createSelector(
  selectFlightBookingState,
  (state) => state.user
);

export const selectActiveUserFlights = createSelector(
  // Selectors
  selectFlights,
  selectBookings,
  selectUser,
  // Projector
  (flights, bookings, user) => {
    const activeUserPassengerId = user.passengerId;
    const activeUserFlightIds = bookings
      .filter(b => b.passengerId === activeUserPassengerId)
      .map(b => b.flightId);
    const activeUserFlights = flights
      .filter(f => activeUserFlightIds.includes(f.id));
    return activeUserFlights;
  }
);

export const customRxOperatorFlightsDelayed = () => pipe(
  select(selectFlights),
  map(flights => flights.filter(f => f.delayed))
);

export const customRxOperatorItemsByFilter =
  <T, K>(
    mapFn: (state: T) => Array<K>,
    filterFn: (item: K) => boolean
  ) => pipe(
    select(mapFn),
    map(arr => arr.filter(filterFn))
  );
