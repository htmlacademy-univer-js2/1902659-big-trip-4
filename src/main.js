import PointsModel from "./model/points-model.js";
import BoardPresenter from "./presenter/board-presenter.js";
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
});

boardPresenter.init();
