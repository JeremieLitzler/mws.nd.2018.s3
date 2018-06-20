const MAX_RATING = 5;
let focusedRatings = 0;
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
  new RatingValidator().IsValid();
}
function handleClickFor(element) {
  element.addEventListener("click", () => {
    selectRatingFor(element);
    return true;
  });

  return false;
}

function handleKeydownFor(element) {
  element.addEventListener("keydown", event => {
    if (event.keyCode == 13) {
      selectRatingFor(element);
    }
  });
}

function handleFocusoutFor(element) {
  element.addEventListener("focusout", event => {
    const isRatingSelected =
      document.querySelector(SELECTED_RATING_CSS_CLASS) != null;
    if (!isRatingSelected) {
      focusedRatings += 1;
      console.log("focused ratings", focusedRatings);
    }
    if (focusedRatings === MAX_RATING) {
      new RatingValidator().IsValid();
    }
  });
}
const ratingElements = document.querySelectorAll(".rating");

if (ratingElements != null || ratingElements != undefined) {
  ratingElements.forEach(element => {
    let isEventHandled = handleClickFor(element);

    if (!isEventHandled) {
      isEventHandled = handleKeydownFor(element);
    }

    if (!isEventHandled) {
      isEventHandled = handleFocusoutFor(element);
    }
  });
}

const authorValidator = new AuthorValidator();

authorValidator.reviewAuthor.addEventListener("focusout", event => {
  authorValidator.IsValid();
});

const reviewValidator = new ReviewDescValidator();

reviewValidator.reviewDesc.addEventListener("focusout", event => {
  reviewValidator.IsValid();
});
