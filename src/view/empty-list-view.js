import AbstractView from "../framework/view/abstract-view.js";
import { createEmptyListTemplate } from "../template/empty-list-template.js";

export default class EmptyListView extends AbstractView {
  #message = null;
  constructor({ message = "Click New Event to create your first point" }) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyListTemplate(this.#message);
  }
}
