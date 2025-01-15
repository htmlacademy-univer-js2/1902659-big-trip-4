import { createElement } from "../render.js";
import { createWaypointTemplate } from "../template/waypoint-template.js";

export default class WaypointView {
  constructor({ point }) {
    this.point = point;
  }

  getTemplate() {
    return createWaypointTemplate(this.point);
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
