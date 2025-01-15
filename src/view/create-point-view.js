import AbstractView from "../framework/view/abstract-view";
import { getEmptyPoint } from "../mock/point";
import createEditPointTemplate from "../template/edit-point-template";

export default class CreatePointView extends AbstractView {
  get template() {
    return createEditPointTemplate(getEmptyPoint());
  }
}
