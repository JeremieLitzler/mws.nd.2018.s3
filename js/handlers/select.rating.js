const SELECTED_RATING_CSS_CLASS = "selected-rating";
function resetSelectedRating() {
  let selectedRating = document.querySelector(`.${SELECTED_RATING_CSS_CLASS}`);
  if (selectedRating != null || selectedRating != undefined) {
    selectedRating.classList.remove(SELECTED_RATING_CSS_CLASS);
  }
}
function selectRatingFor(element) {
  resetSelectedRating();
  element.classList.add(SELECTED_RATING_CSS_CLASS);
}
const ratingElements = document.querySelectorAll(".rating");

if (ratingElements != null || ratingElements != undefined) {
  ratingElements.forEach(element => {
    element.addEventListener("click", () => {
      selectRatingFor(element);
    });
    element.addEventListener("keydown", event => {
      if (event.keyCode == 13) {
        selectRatingFor(element);
      }
    });
  });
}
