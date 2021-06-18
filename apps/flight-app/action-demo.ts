import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const flightsLoaded = createAction(
  '[FlightBooking] FlightsLoaded',
  props<{flights: Flight[]}>()
);


flightsLoaded({
  flights: [
    {
      id: 999,
      from: 'London',
      to: 'New York',
      date: new Date().toISOString(),
      delayed: false
    }
  ]
});


const concreteActionObj = {
  type: '[FlightBooking] FlightsLoaded',
  flights: [
    {
      id: 999,
      from: 'London',
      to: 'New York',
      date: new Date().toISOString(),
      delayed: false
    }
  ]
};
