import { humanizePointDate, getDateDifference } from "../utils.js";
import { findDestination, getOfferById } from "../utils.js";

function getOffersTemplate(offers, type) {
  const res = [];
  for (const offerId of offers) {
    const offer = getOfferById(offerId, type);
    res.push([offer.title, offer.price]);
  }
  return res
    .map(
      (item) => `<li class="event__offer">
                    <span class="event__offer-title">${item[0]}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${item[1]}</span>
                  </li>`
    )
    .join(" ");
}

function createWaypointTemplate(point) {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers, type } =
    point;
  const dateF = humanizePointDate(dateFrom);
  const dateT = humanizePointDate(dateTo);
  const destName = findDestination(destination).name;
  const offersTemplate = getOffersTemplate(offers, type);
  const eventDuration = getDateDifference(dateFrom, dateTo);
  const isFavoritePoint = isFavorite ? " event__favorite-btn--active" : "";
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dateF}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateF}">${dateF}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateT}">${dateT}</time>
                  </p>
                  <p class="event__duration">${eventDuration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersTemplate}
                </ul>
                <button class="event__favorite-btn${isFavoritePoint}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export { createWaypointTemplate };
