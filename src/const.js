const CITIES = ["Paris", "London", "Moscow", "Tokio", "Amsterdam", "Geneva"];

const EVENTS = [
  "drive",
  "flight",
  "check-in",
  "sightseeing",
  "restaurant",
  "ship",
  "bus",
  "train",
  "taxi",
];

const pointDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`;

const SortType = {
  DATE_DOWN: "date-down",
  TIME_DOWN: "time-down",
  PRICE_DOWN: "price-down",
};

const UserAction = {
  UPDATE_POINT: "UPDATE_POINT",
  ADD_POINT: "ADD_POINT",
  DELETE_POINT: "DELETE_POINT",
};
const UpdateType = {
  PATCH: "PATCH",
  MINOR: "MINOR",
  MAJOR: "MAJOR",
};
const FilterType = {
  EVERYTHING: "EVERYTHING",
  FUTURE: "FUTURE",
  PRESENT: "PRESENT",
  PAST: "PAST",
};
export {
  EVENTS,
  CITIES,
  pointDescription,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
};
