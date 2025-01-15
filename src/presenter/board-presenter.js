import { RenderPosition } from "../render";
import EventListView from "../view/event-list-view";
import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";
import TripInfoView from "../view/trip-info-view";
import WaypointView from "../view/waypoint-view";
import EditPointView from "../view/edit-point-view";
import { replace, render } from "../framework/render";

export default class BoardPresenter {
  #sortComponent = new SortView();
  #infoComponent = new TripInfoView();
  #filterComponent = new FilterView();
  #eventListComponent = new EventListView();
  #container = null;
  #header = null;
  #pointsModel = null;
  #boardPoints = null;

  constructor({ container, header, pointsModel }) {
    this.#container = container;
    this.#header = header;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.getPoints()];
  }

  init() {
    render(this.#infoComponent, this.#header, RenderPosition.AFTERBEGIN);
    render(this.#filterComponent, this.#header);
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      render(this.#renderPoint(this.#boardPoints[i]));
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === "Escape") {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener("keydown", escKeyDownHandler);
      }
    };

    const pointComponent = new WaypointView({
      point: point,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener("keydown", escKeyDownHandler);
      },
    });

    const pointEditComponent = new EditPointView({
      point: point,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener("keydown", escKeyDownHandler);
      },
      onButtonClick: () => {
        replaceFormToPoint();
        document.removeEventListener("keydown", escKeyDownHandler);
      },
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#eventListComponent.element);
  }
}
