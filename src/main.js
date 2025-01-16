import PointsModel from "./model/points-model.js";
import BoardPresenter from "./presenter/board-presenter.js";
import NewPointButtonView from "./view/new-point-button-view.js";
import { render } from "./framework/render.js";
import FilterModel from "./model/filter-model.js";

const bodyElement = document.querySelector("body");
const headerElement = bodyElement.querySelector(".page-header");
const tripInfoElement = headerElement.querySelector(".trip-main");
const mainElement = bodyElement.querySelector(".page-main");
const eventListElement = mainElement.querySelector(".trip-events");

const pointModel = new PointsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  container: eventListElement,
  header: tripInfoElement,
  pointsModel: pointModel,
  filterModel: filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});
function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}
function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}
render(newPointButtonComponent, tripInfoElement);

boardPresenter.init();
