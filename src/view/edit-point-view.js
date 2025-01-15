import { createElement } from "../render";
import { createEditPointTemplate } from "../template/edit-point-template";

export default class EditPointView {
  constructor({ point }) {
    this.point = point;
  }

  getTemplate() {
    return createEditPointTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
