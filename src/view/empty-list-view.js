import AbstractView from "../framework/view/abstract-view.js";
import { createEmptyListTemplate } from "../template/empty-list-template.js";
import { FilterType } from "../const.js";

export default class EmptyListView extends AbstractView {
  #message = null;
  constructor({ filterType }) {
    super();

    switch (filterType) {
      case FilterType.EVERYTHING:
        this.#message = "Click New Event to create your first point";
        break;
      case FilterType.FUTURE:
        this.#message = "You have no future events";
        break;
      case FilterType.PAST:
        this.#message = "You have no past events";
        break;
      case FilterType.PRESENT:
        this.#message = "You have no present events";
        break;
    }
  }

  get template() {
    return createEmptyListTemplate(this.#message);
  }
}
