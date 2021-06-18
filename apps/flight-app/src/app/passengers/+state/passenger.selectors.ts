import { createFeatureSelector } from "@ngrx/store";
import { adapter } from "./passenger.reducer";
import * as fromPassenger from './passenger.reducer';

export const selectPassengerState = createFeatureSelector<fromPassenger.State>(
  fromPassenger.passengersFeatureKey
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectPassengerState);
