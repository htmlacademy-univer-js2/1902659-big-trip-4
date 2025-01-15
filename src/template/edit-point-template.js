import { humanizeTaskDueDate } from "../utils";
import { findDestination, getOffers } from "../mock/point";
import { EVENTS } from "../const";

function createOffersTemplate(offers) {
  return offers
    .map(
      (item) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.id}-1" type="checkbox" name="event-offer-${item.id}">
  <label class="event__offer-label" for="event-offer-${item.id}-1">
    <span class="event__offer-title">${item.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${item.price}</span>
  </label>
</div>`
    )
    .join("");
}

function isChecked(type, item) {
  return type === item ? " checked" : "";
}

function createEventsTemplate(type) {
  return EVENTS.map(
    (item) => `<div class="event__type-item">
                          <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}"${isChecked(
  type,
  item
)}>
                          <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${
  item[0].toUpperCase() + item.slice(1)
}</label>
                        </div>`
  ).join("");
}

function createEditPointTemplate(point) {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = point;
  const dateF = humanizeTaskDueDate(dateFrom);
  const dateT = humanizeTaskDueDate(dateTo);
  const destName = findDestination(destination).name;
  const destDescription = findDestination(destination).description;
  const offersList = getOffers(offers, type);
  const offersTemplate = createOffersTemplate(offersList);
  const eventsTemplate = createEventsTemplate(type);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventsTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destName}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="${destName}"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateF}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateT}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${offersTemplate}
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destDescription}</p>
                  </section>
                </section>
              </form>
            </li>`;
}

export { createEditPointTemplate };
