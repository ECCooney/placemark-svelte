import { writable } from "svelte/store";

import type { Placemark, LoggedInUser } from "./services/placemark-types";
import type { MarkerSpec } from "./services/markers";

export const loggedInUser = writable<LoggedInUser>();
export const latestPlacemark = writable<Placemark>();
export const markerSelected = writable<MarkerSpec>();