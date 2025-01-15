import AbstractView from "../framework/view/abstract-view.js";
import { createWaypointTemplate } from "../template/waypoint-template.js";

export default class WaypointView extends AbstractView {
  #point = null;
  #handleEditClick = null;

  constructor({ point, onEditClick }) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this.#editClickHandler);
  }

  get template() {
    return createWaypointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
