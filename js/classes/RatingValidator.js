class RatingValidator {
  constructor() {
    this.selectRatingElement = document.querySelector(".selected-rating");
    this.inputRating = document.querySelector(".input-rating");
    this.ratingValidation = document.createElement("p");
    this.ratingValidation.className = "validation-rating";
  }
  AddValidationMessageElement() {
    const ratingValidation = document.querySelector(".validation-rating");
    if (ratingValidation != null) {
      this.inputRating.removeChild(ratingValidation);
    }
  }
  IsValid() {
    this.AddValidationMessageElement();
    if (
      this.selectRatingElement == null ||
      this.selectRatingElement == undefined
    ) {
      this.PrintNoSelectedRatingMessage();
      return false;
    }

    this.PrintSelectedRatingMessage();
    return true;
  }

  PrintNoSelectedRatingMessage() {
    this.ratingValidation.innerHTML = "Please select a rating.";
    this.ratingValidation.classList.add("validation-ko");
    this.inputRating.appendChild(this.ratingValidation);
    this.inputRating.classList.remove("is-ok");
    this.inputRating.classList.add("is-ko");
  }

  PrintSelectedRatingMessage() {
    this.ratingValidation.innerHTML = ":)";
    this.ratingValidation.classList.add("validation-ok");
    this.inputRating.appendChild(this.ratingValidation);
    this.inputRating.classList.remove("is-ko");
    this.inputRating.classList.add("is-ok");
  }
}
