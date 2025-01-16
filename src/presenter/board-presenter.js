import { RenderPosition } from "../render";
import EventListView from "../view/event-list-view";
import SortView from "../view/sort-view";
import TripInfoView from "../view/trip-info-view";
import { sortDateDown, sortTimeDown, sortPriceDown } from "../utils";
import { render, remove } from "../framework/render";
import PointPresenter from "./point-presenter";
import { SortType, UserAction, UpdateType, FilterType } from "../const";
import NewPointPresenter from "./new-point-presenter.js";
import EmptyListView from "../view/empty-list-view.js";
import { filter } from "../utils";
import FilterPresenter from "./filter-presenter.js";

export default class BoardPresenter {
  #sortComponent = null;
  #infoComponent = new TripInfoView(0);
  #eventListComponent = new EventListView();
  #noPointComponent = null;
  #container = null;
  #header = null;
  #pointsModel = null;
  #filterModel = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #filterPresenter = null;

  #currentSortType = SortType.DATE_DOWN;

  constructor({
    container,
    header,
    pointsModel,
    filterModel,
    onNewPointDestroy,
  }) {
    this.#container = container;
    this.#header = header;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#header,
      filterModel,
      pointsModel,
    });
  }

  init() {
    this.#renderBoard();
    this.#filterPresenter.init();
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DATE_DOWN:
        return filteredPoints.sort(sortDateDown);
      case SortType.PRICE_DOWN:
        return filteredPoints.sort(sortPriceDown);
      case SortType.TIME_DOWN:
        return filteredPoints.sort(sortTimeDown);
    }
    return this.#pointsModel.points;
  }

  get totalCost() {
    let summ = 0;
    for (const pointPresenter of this.#pointPresenters.values()) {
      summ += pointPresenter.totalPointCost;
    }
    return summ;
  }

  createPoint() {
    this.#currentSortType = SortType.DATE_DOWN;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#newPointPresenter.init();
  }

  #renderNoPoints() {
    this.#noPointComponent = new EmptyListView({
      filterType: this.#filterModel.filter,
    });
    render(this.#noPointComponent, this.#container);
  }

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
    this.#renderSort();
    this.#renderBoardList();
    if (this.#pointPresenters.size === 0) {
      this.#renderNoPoints(this.#filterModel.filter);
    }
    this.#infoComponent.totalCost = this.totalCost;
    render(this.#infoComponent, this.#header, RenderPosition.AFTERBEGIN);
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
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#infoComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DATE_DOWN;
    }
  }
}
