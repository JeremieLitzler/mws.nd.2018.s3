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

    this.InitializeSubmitFeedback();
    const isReviewSaved = this.PostToApi()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  }
  /**
   * Add a feedback paragraph to let the user know we are processing the request.
   */
  InitializeSubmitFeedback() {
    const formElement = document.querySelector(".new-review");
    const submissionFeedBackElement = document.createElement("p");
    submissionFeedBackElement.className = "validation is-processing";
    submissionFeedBackElement.innerHTML = "Saving your review...";
  }
  /**
   *
   */
  PostToApi() {
    // save review in idb cache
    this.SaveReviewInSpecificCache();
    //read the restaurant object
    const restaurantId = new RestaurantPage().getRestaurantId();
    fetchRestaurant(restaurantId).then(restaurant => {
      //add the review to the list of reviews
      console.log(restaurant.reviews);
      this.AddReviewToRestaurantObj(restaurant);
      console.log(restaurant.reviews);
      //send to api
      return saveToApi(restaurant);
    });
  }
  AddReviewToRestaurantObj(restaurant) {
    if (restaurant.reviews == null || restaurant.reviews == undefined) {
      console.warn(
        `Restaurant ${restaurant.id} has no reviews... Initializing the list...`
      );
      restaurant.reviews = [];
    }
    const finalReviewObject = this.BuildFinalReview();
    restaurant.reviews.push(finalReviewObject);
  }
  /**
   *
   */
  BuildFinalReview() {
    return {
      name: this.reviewInstance.author,
      rating: this.reviewInstance.ratingValue,
      comments: this.reviewInstance.reviewDesc,
      date: new Date(Date.now()).toDateString()
    };
  }
  SaveReviewInSpecificCache() {}
}
