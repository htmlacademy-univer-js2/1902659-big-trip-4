import { RenderPosition } from "../render";
import EventListView from "../view/event-list-view";
import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";
import TripInfoView from "../view/trip-info-view";
import { sortDateDown, sortTimeDown, sortPriceDown } from "../utils";
import { render, remove } from "../framework/render";
import PointPresenter from "./point-presenter";
import { SortType, UserAction, UpdateType } from "../const";

export default class BoardPresenter {
  #sortComponent = null;
  #infoComponent = new TripInfoView();
  #filterComponent = new FilterView();
  #eventListComponent = new EventListView();
  #container = null;
  #header = null;
  #pointsModel = null;
  #pointPresenters = new Map();

  #currentSortType = SortType.DATE_DOWN;

  constructor({ container, header, pointsModel }) {
    this.#container = container;
    this.#header = header;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DATE_DOWN:
        return [...this.#pointsModel.points].sort(sortDateDown);
      case SortType.PRICE_DOWN:
        return [...this.#pointsModel.points].sort(sortPriceDown);
      case SortType.TIME_DOWN:
        return [...this.#pointsModel.points].sort(sortTimeDown);
    }
    return this.#pointsModel.points;
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#container);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters?.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearBoard({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DATE_DOWN;
    }
  }
}
