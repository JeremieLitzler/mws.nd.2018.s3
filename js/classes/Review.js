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
