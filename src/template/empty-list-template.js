function createEmptyListTemplate(
  listText = "Click New Event to create your first point"
) {
  return `<div class="page-body__container">
        <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
          <p class="trip-events__msg">${listText}</p>
        </section>
      </div>`;
}
export { createEmptyListTemplate };
