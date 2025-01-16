import AbstractStatefulView from "../framework/view/abstract-view";
import { createEditPointTemplate } from "../template/edit-point-template";
import { findOffersByType, findDestinationId } from "../mock/point";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleButtonClick = null;
  #datepicker = null;

  constructor({ point, onFormSubmit, onButtonClick }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonClick = onButtonClick;
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  _restoreHandlers() {
    this.element
      .querySelector("form") // event /+ event--edit
      .addEventListener("submit", this.#formSubmitHandler);

    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this.#buttonClickHandler);

    this.element
      .querySelector(".event__type-group")
      .addEventListener("change", this.#typeChangeHandler);

    const dests = this.element.querySelectorAll(".event__input--destination");
    for (const dest of dests) {
      dest.addEventListener("change", this.#destChangeHandler);
    }

    const container = this.element.querySelector(".event__section--offers");
    const checkboxes = container.querySelectorAll(".event__offer-checkbox");
    for (const checkbox of checkboxes) {
      checkbox.addEventListener("click", this.#offerClickHandler);
    }

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #setDatepickerFrom() {
    const startTimeInput = this.element.querySelector("#event-start-time-1");
    this.#datepicker = flatpickr(startTimeInput, {
      dateFormat: "j F",
      defaultDate: this._state.dateFrom,
      onChange: this.#dateFromChangeHandler, // На событие flatpickr передаём наш колбэк
    });
  }

  #setDatepickerTo() {
    const endTimeInput = this.element.querySelector("#event-end-time-1");
    this.#datepicker = flatpickr(endTimeInput, {
      dateFormat: "j F",
      defaultDate: this._state.dateTo,
      onChange: this.#dateToChangeHandler, // На событие flatpickr передаём наш колбэк
    });
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #destChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: findDestinationId(evt.target.value).id,
    });
  };

  #offerClickHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    let offersCopy = [...this._state.offers];
    if (evt.target.checked) {
      if (!offersCopy.includes(value)) {
        offersCopy.push(value);
      }
    } else {
      offersCopy = offersCopy.filter((item) => item !== value);
    }
    this.updateElement({
      offers: offersCopy,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: findOffersByType(evt.target.value),
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };

  static parsePointToState(task) {
    return { ...task };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
