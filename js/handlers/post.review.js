class Review {
  constructor() {
    this.ratingValue = undefined;
    this.author = undefined;
    this.reviewDesc = undefined;
  }
  static get maxRating() {
    return 5;
  }
  static get minRating() {
    return 0;
  }

  IsValid() {
    this.IsRatingValid();
  }
  IsRatingValid() {
    if (this.ratingValue === undefined || this.ratingValue === null) {
      throw new Error("rating cannot undefined of null");
    }
    if (this.ratingValue > Review.maxRating) {
      throw new Error(
        `Expected max rating: ${Review.maxRating}. Actual: ${this.ratingValue}`
      );
    }
    if (this.ratingValue < Review.minRating) {
      throw new Error(
        `Expected max rating: ${Review.minRating}. Actual: ${this.ratingValue}`
      );
    }
  }
}
class ReviewSaver {
  constructor() {
    this.ratingElem = document.querySelector(".selected-rating");
    this.authorElem = document.querySelector("#author");
    this.reviewDescElem = document.querySelector("#review-desc");
    this.reviewInstance = new Review();
  }
  Save() {
    if (this.ratingElem != null) {
      this.reviewInstance.ratingValue = this.ratingElem.innerHTML;
    }
    this.reviewInstance.author = this.authorElem.value;
    this.reviewInstance.reviewDesc = this.reviewDescElem.value;

    //this.reviewInstance.IsValid();
    console.log(this.reviewInstance);
  }
}

const saveReview = document.querySelector(".js-save-review");

if (saveReview) {
  saveReview.addEventListener("click", () => {
    new ReviewSaver().Save();
  });
}
