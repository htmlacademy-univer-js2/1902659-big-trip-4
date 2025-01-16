import AbstractView from "../framework/view/abstract-view.js";
import { createFilterTemplate } from "../template/filter-template.js";

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #handleFilterTypeChange = null;
  #filters = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener("change", this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
