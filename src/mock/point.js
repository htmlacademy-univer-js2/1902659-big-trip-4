import { getRandomArrayElement } from "../utils.js";
import { CITIES } from "../const.js";
import { nanoid } from "nanoid";

const emptyPoint = {
  basePrice: 0,
  dateFrom: "2024-01-01T00:00:00Z",
  dateTo: "2025-01-01T00:00:00Z",
  destination: "a0",
  isFavorite: false,
  offers: [],
  type: "taxi",
};

const mockPoints = [
  {
    basePrice: 1100,
    dateFrom: "2019-06-10T22:00:56.845Z",
    dateTo: "2019-06-12T11:22:13.375Z",
    destination: "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
    isFavorite: false,
    offers: [
      "b4c3e4e6-9053-42ce-b747-e281314baa31",
      "a4c3e4e6-9053-42ce-b747-e281314baa31",
    ],
    type: "taxi",
  },
  {
    basePrice: 1200,
    dateFrom: "2019-04-10T22:55:56.845Z",
    dateTo: "2019-05-11T11:22:13.375Z",
    destination: "cfe416cq-10xa-ye10-8077-2fs9a01edcab",
    isFavorite: true,
    offers: ["b4c3e4e6-9053-42ce-b747-e281314baa31"],
    type: "taxi",
  },
  {
    basePrice: 100,
    dateFrom: "2019-01-10T22:55:56.845Z",
    dateTo: "2019-03-11T11:22:13.375Z",
    destination: "cfe416cq-10xa-ye10-8077-2fs9a01edcab",
    isFavorite: true,
    offers: ["e4c3e4e6-9053-42ce-b747-e281314baa31"],
    type: "flight",
  },
];

const mockOptions = [
  {
    type: "taxi",
    offers: [
      {
        id: "b4c3e4e6-9053-42ce-b747-e281314baa31",
        title: "Upgrade to a business class",
        price: 120,
      },
      {
        id: "a4c3e4e6-9053-42ce-b747-e281314baa31",
        title: "Upgrade to a elite class",
        price: 200,
      },
    ],
  },
  {
    type: "flight",
    offers: [
      {
        id: "e4c3e4e6-9053-42ce-b747-e281314baa31",
        title: "Upgrade to a business class",
        price: 320,
      },
      {
        id: "d4c3e4e6-9053-42ce-b747-e281314baa31",
        title: "Upgrade to a elite class",
        price: 300,
      },
    ],
  },
];

const mockDestination = [
  {
    id: "a0",
    description: "-",
    name: "-",
    pictures: [{}],
  },
  {
    id: "cfe416cq-10xa-ye10-8077-2fs9a01edcab",
    description:
      "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
    name: "Chamonix",
    pictures: [
      {
        src: "https://dummyimage.com/640x360/eee/aaa",
        description: "Chamonix parliament building",
      },
      {
        src: "https://dummyimage.com/640x360/eee/aaa",
        description: "Chamonix parliament building",
      },
    ],
  },
  {
    id: "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
    description:
      "Paris, is a beautiful city, a true pearl, with crowded streets.",
    name: "Paris",
    pictures: [
      {
        src: "https://dummyimage.com/640x360/eee/aaa",
        description: "Paris parliament building",
      },
    ],
  },
];

function getRandomCity() {
  return getRandomArrayElement(CITIES);
}

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints),
  };
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
