import AbstractView from "../framework/view/abstract-view";
import { createEditPointTemplate } from "../template/edit-point-template";

export default class EditPointView extends AbstractView {
  #point = null;
  #handleFormSubmit = null;
  #handleButtonClick = null;

  constructor({ point, onFormSubmit, onButtonClick }) {
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonClick = onButtonClick;

    this.element
      .querySelector(".event--edit")
      .addEventListener("submit", this.#formSubmitHandler);

    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this.#buttonClickHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}
