import { render, RenderPosition } from "../render";
import EventListView from "../view/event-list-view";
import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";
import TripInfoView from "../view/trip-info-view";
import WaypointView from "../view/waypoint-view";

export default class BoardPresenter {
  sortComponent = new SortView();
  infoComponent = new TripInfoView();
  filterComponent = new FilterView();
  eventListComponent = new EventListView();

  constructor({ container, header }) {
    this.container = container;
    this.header = header;
  }

  init() {
    render(this.infoComponent, this.header, RenderPosition.AFTERBEGIN);
    render(this.filterComponent, this.header);
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    render(new EventListView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.eventListComponent.getElement());
    }
  }
}
