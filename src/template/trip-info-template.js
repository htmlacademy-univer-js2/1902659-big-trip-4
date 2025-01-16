import { humanizePointDate } from "../utils.js";

function getCitiesTemplate(cities) {
  return cities.map((city) => `${city}`).join(" &mdash; ");
}

function createTripInfoTemplate(totalCost, cities) {
  const cityTemplate = getCitiesTemplate(cities);
  const date1 = humanizePointDate("2019-07-10T22:55:56.845Z");
  const date2 = humanizePointDate("2019-07-11T11:22:13.375Z");
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${cityTemplate}</h1>

              <p class="trip-info__dates">${date1}&nbsp;&mdash;&nbsp;${date2}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
            </p>
          </section>`;
}

export { createTripInfoTemplate };
