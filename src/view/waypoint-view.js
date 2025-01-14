import { createElement } from "../render.js";
import { createWaypointTemplate } from "../template/waypoint-template.js";

export default class WaypointView {
  getTemplate() {
    return createWaypointTemplate();
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
