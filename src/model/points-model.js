import Observable from "../framework/observable";
import { getRandomPoint } from "../utils";

const POINT_COUNT = 3;

export default class PointsModel extends Observable {
  #points = Array.from(
    {
      length: POINT_COUNT,
    },
    getRandomPoint
  );

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error("Can't update unexisting task");
    }
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    update = { ...update, id: crypto.randomUUID() };
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);
    if (index === -1) {
      throw new Error("Can't delete unexisting task");
    }
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
