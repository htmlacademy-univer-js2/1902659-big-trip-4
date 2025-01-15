import { RenderPosition } from "../render";
import EventListView from "../view/event-list-view";
import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";
import TripInfoView from "../view/trip-info-view";
import { updateItem } from "../utils";
import { render } from "../framework/render";
import PointPresenter from "./point-presenter";

export default class BoardPresenter {
  #sortComponent = new SortView();
  #infoComponent = new TripInfoView();
  #filterComponent = new FilterView();
  #eventListComponent = new EventListView();
  #container = null;
  #header = null;
  #pointsModel = null;
  #boardPoints = null;
  #pointPresenters = new Map();

  constructor({ container, header, pointsModel }) {
    this.#container = container;
    this.#header = header;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.getPoints()];
  }

  init() {
    this.#renderBoard();
  }

  #renderSort() {
    render(this.#sortComponent, this.#container);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handlePointChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#boardPoints.forEach((task) => this.#renderPoint(task));
  }

  #renderBoardList() {
    render(this.#eventListComponent, this.#container);
    this.#renderPoints();
  }

  #renderBoard() {
    render(this.#infoComponent, this.#header, RenderPosition.AFTERBEGIN);
    render(this.#filterComponent, this.#header);
    this.#renderSort();
    this.#renderBoardList();
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
