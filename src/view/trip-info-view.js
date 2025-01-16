import AbstractView from "../framework/view/abstract-view.js";
import { createTripInfoTemplate } from "../template/trip-info-template.js";

export default class TripInfoView extends AbstractView {
  #totalCost = 0;
  constructor({ totalCost = 0 }) {
    super();
    this.#totalCost = totalCost;
  }

  set totalCost(newPrice) {
    this.#totalCost = newPrice;
  }

  get totalCost() {
    return this.#totalCost;
  }

  get template() {
    return createTripInfoTemplate(this.#totalCost);
  }
}
