import AbstractView from "../framework/view/abstract-view.js";
import { createWaypointTemplate } from "../template/waypoint-template.js";

export default class WaypointView extends AbstractView {
  #point = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this.#editClickHandler);
    this.element
      .querySelector(".event__favorite-btn")
      .addEventListener("click", this.#favoriteClickHandler);
  }

  get template() {
    return createWaypointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
