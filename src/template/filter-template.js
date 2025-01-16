import { FilterType } from "../const";

function createFilterItemTemplate(type, currentFilterType) {
  return `<div class="trip-filters__filter">
              <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${
  type === currentFilterType ? "checked" : ""
}>
              <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
          </div>`;
}

function createFilterTemplate(currentFilterType) {
  const filtersTemplate = Object.entries(FilterType)
    .map(([value]) => createFilterItemTemplate(value, currentFilterType))
    .join("");
  return `<form class="trip-filters" action="#" method="get">
                ${filtersTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export { createFilterTemplate };
