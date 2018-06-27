class ReviewSaver {
  constructor() {
    this.ratingElem = document.querySelector(".selected-rating");
    this.authorElem = document.querySelector("#author");
    this.reviewDescElem = document.querySelector("#review-desc");
    this.reviewInstance = new Review();
  }
  Save() {
    if (this.ratingElem != null) {
      this.reviewInstance.ratingValue = this.ratingElem.textContent;
    }
    this.reviewInstance.author = this.authorElem.value;
    this.reviewInstance.reviewDesc = this.reviewDescElem.value;

    //this.reviewInstance.IsValid();
    console.log(this.reviewInstance);

    this.InitializeSubmitFeedback();
    this.PostToApi()
      .then(result => {
        //display success message
        if (result != null) {
          new RestaurantPage().fillReviewsHTML(result.restaurant.reviews);
          this.DisplaySubmissionEndNotification(result);
          return;
        }
        console.log(result);
      })
      .catch(err => {
        //any other error not handled
        console.error("Check the error stack", err);
      });
  }
  /**
   * Add a feedback paragraph to let the user know we are processing the request.
   */
  InitializeSubmitFeedback() {
    const formElement = document.querySelector(".new-review");
    const newSubmissionFeedBackElement = document.createElement("p");

    newSubmissionFeedBackElement.className = "submit-result is-processing";
    newSubmissionFeedBackElement.textContent = "Saving your review...";
    formElement.appendChild(newSubmissionFeedBackElement);
  }
  /**
   * Display the feedback after review is saved, independant of the status.
   * @param {responseObject} result
   */
  DisplaySubmissionEndNotification(result) {
    const submissionFeedbackElement = document.querySelector(".submit-result");
    let feedbackMessage = `Thank you for reviewing ${result.restaurant.name}.`;
    if (!result.status) {
      feedbackMessage +=
        " Since you are offline, your review would be saved once you connect your device to a Wifi or mobile network.";
    }
    if (submissionFeedbackElement != null) {
      submissionFeedbackElement.textContent = feedbackMessage;
    }
  }
  /**
   *
   */
  PostToApi() {
    const restaurantId = new RestaurantPage().getRestaurantId();
    return fetchRestaurant(restaurantId).then(restaurant => {
      this.AddReviewToRestaurantObj(restaurant);
      return this.ProcessApiResponse(restaurant);
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
  /**
   * Handle the reply of the API.
   * If the API call failed, we still have the complete restaurant object.
   * True means we can tell that the user that the review was saved.
   * False means we will save the review using background sync.
   * @param {restaurant} restaurant
   */
  ProcessApiResponse(restaurant) {
    return saveToApi(restaurant)
      .then(apiResult => {
        return this.BuildResponseObject(apiResult, restaurant);
      })
      .catch(err => {
        console.error("Unhandled error. Check call stack", err);
      });
  }

  /**
   * Create the response following the api call.
   * @param {boolean} apiResult
   * @param {restaurant} restaurant
   */
  BuildResponseObject(apiResult, restaurant) {
    if (!apiResult) {
      console.warn(
        "The review wasn't save by the API... Caching it for background sync..."
      );
      this.SaveReviewInSpecificCacheFor(restaurant);
    }
    return {
      status: apiResult,
      restaurant: restaurant
    };
  }
  /**
   * Cache the review for a given restaurant
   * @param {Restaurant} restaurant
   */
  SaveReviewInSpecificCacheFor(restaurant) {
    cacheReview(restaurant, this.reviewInstance);
  }
}
