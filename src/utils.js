import dayjs from "dayjs";

const DATE_FORMAT = "D MMMM";

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : "";
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPicture() {
  return `https://loremflickr.com/248/152?random=${Math.floor(
    Math.random() * 1000
  )}`;
}

export { getRandomArrayElement, humanizeTaskDueDate, getRandomPicture };
