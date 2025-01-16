import AbstractView from "../framework/view/abstract-view.js";
import { createTripInfoTemplate } from "../template/trip-info-template.js";

export default class TripInfoView extends AbstractView {
  #totalCost = 0;
  #cities = [];

  constructor({ totalCost = 0, cities = [] }) {
    super();
    this.#totalCost = totalCost;
    this.#cities = cities;
  }

  set cities(newVal) {
    this.#cities = newVal;
  }

  get cities() {
    return this.#cities;
  }

  set totalCost(newPrice) {
    this.#totalCost = newPrice;
  }

  get totalCost() {
    return this.#totalCost;
  }

  get template() {
    return createTripInfoTemplate(this.#totalCost, this.#cities);
  }
}
