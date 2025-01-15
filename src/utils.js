import dayjs from "dayjs";

const DATE_FORMAT = "D MMMM";

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : "";
}
function humanizePointDate(dueDate) {
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

function updateItem(items, update) {
  return items.map((item) => (item.id === update.id ? update : item));
}

function sortDateDown(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortTimeDown(pointA, pointB) {
  const length1 = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const length2 = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return dayjs(length1).diff(dayjs(length2));
}

function sortPriceDown(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice;
}

function getDateDifference(date1, date2) {
  const startDate = dayjs(date1);
  const endDate = dayjs(date2);

  const diffInMilliseconds = endDate.diff(startDate);

  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `${days} days ${hours} hours ${minutes} minutes`;
}

export {
  getRandomArrayElement,
  humanizeTaskDueDate,
  getRandomPicture,
  updateItem,
  sortDateDown,
  sortTimeDown,
  sortPriceDown,
  humanizePointDate,
  getDateDifference,
};
