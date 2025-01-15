import AbstractView from "../framework/view/abstract-view.js";
import { createTripInfoTemplate } from "../template/trip-info-template.js";

export default class TripInfoView extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
