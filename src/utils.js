import dayjs from "dayjs";
import { CITIES } from "./const.js";
import {
  mockPoints,
  mockDestination,
  mockOptions,
  emptyPoint,
} from "./mock/point.js";
import { nanoid } from "nanoid";
import { FilterType } from "./const.js";

const DATE_FORMAT = "D MMMM";

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : "";
}
function humanizePointDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : "";
}

function getRandomCity() {
  return getRandomArrayElement(CITIES);
}

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints),
  };
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

function findDestination(destId) {
  const foundDest = mockDestination.find((item) => {
    if (item.id === destId) {
      return item;
    }
  });
  return foundDest ? foundDest : [];
}
function findDestinationId(destName) {
  const foundDest = mockDestination.find((item) => {
    if (item.name === destName) {
      return item;
    }
  });
  return foundDest ? foundDest : [];
}
function findOfferByType(optionType) {
  return mockOptions.find((item) => {
    if (item.type === optionType) {
      return item;
    }
  }).offers[0];
}
function getOfferById(offerId, type) {
  return mockOptions
    .find((item) => item.type === type)
    .offers.find((offer) => offer.id === offerId);
}
function findOffersByType(optionType) {
  const foundOption = mockOptions.find((item) => item.type === optionType);
  return foundOption ? foundOption.offers : [];
}
function findSpecialOffer(optionType) {
  return findOfferByType(optionType).title;
}
function getOffers(offersId, type) {
  const offersAll = findOffersByType(type);
  const foundOffers = [];
  for (const offer of offersAll) {
    if (offersId.includes(offer.id)) {
      foundOffers.push(offer);
    }
  }
  return foundOffers;
}
function getEmptyPoint() {
  return emptyPoint;
}
function getDestinations() {
  return mockDestination;
}
function getDestinationsNames() {
  return mockDestination.map((dest) => dest.name);
}
function getDestinationNameById(destId) {
  return mockDestination.find((item) => item.id === destId).name;
}
function getOfferPrice(typeName, offerId) {
  return mockOptions
    .find((item) => item.type === typeName)
    .offers.find((offer) => offer.id === offerId).price;
}

function isPointFuture(point) {
  return dayjs() < dayjs(point.dateFrom);
}
function isPointPresent(point) {
  return dayjs().date === dayjs(point.dateFrom).date;
}
function isPointPast(point) {
  return dayjs() > dayjs(point.dateFrom);
}
const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) =>
    points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) =>
    points.filter((point) => isPointPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
};
export { filter };

export {
  getRandomPoint,
  findDestination,
  findSpecialOffer,
  getRandomCity,
  getOffers,
  getEmptyPoint,
  findOffersByType,
  getDestinations,
  findDestinationId,
  getDestinationsNames,
  getDestinationNameById,
  getOfferPrice,
  getOfferById,
};
export { humanizePointDate, sortDateDown, sortPriceDown, sortTimeDown };

export {
  getRandomArrayElement,
  humanizeTaskDueDate,
  getRandomPicture,
  updateItem,
  getDateDifference,
};
