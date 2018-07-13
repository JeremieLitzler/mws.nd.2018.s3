class ReviewSaver {
  constructor() {
    this.ratingElem = document.querySelector(".selected-rating");
    this.authorElem = document.querySelector("#author");
    this.reviewDescElem = document.querySelector("#review-desc");
    this.reviewInstance = new Review();
  }
  Save() {
    this.ReadFormToFillReviewInstance();
    this.InitializeSubmitFeedback();
    this.PostToApi();
  }
  ReadFormToFillReviewInstance() {
    if (this.ratingElem != null) {
      this.reviewInstance.ratingValue = this.ratingElem.textContent;
    }
    this.reviewInstance.author = this.authorElem.value;
    this.reviewInstance.reviewDesc = this.reviewDescElem.value;
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
    return fetchRestaurant(restaurantId)
      .then(restaurant => {
        const newReview = this.AddReviewToRestaurantObj(restaurant);
        return this.ProcessApiResponse(restaurant, newReview);
      })
      .then(finalResponse => {
        //display success message
        if (finalResponse == null) {
          throw new Error("Final response cannot be null");
        }
        if (finalResponse.status == undefined || finalResponse.status == null) {
          throw new Error(
            "Final response must contains a status. Expected: true or false"
          );
        }

        if (finalResponse.status) {
          this.SaveReviewInSpecificCacheFor(
            finalResponse.restaurant,
            finalResponse.review
          );
        }
        fetchRestaurant(restaurantId).then(restaurant => {
          new RestaurantPage().fillReviewsHTML(restaurant.reviews);
          this.DisplaySubmissionEndNotification(finalResponse);
        });
      })
      .catch(err => {
        //any other error not handled
        console.error("Check the error stack", err);
      });
  }
  AddReviewToRestaurantObj(restaurant) {
    if (restaurant.reviews == null || restaurant.reviews == undefined) {
      console.warn(
        `Restaurant ${restaurant.id} has no reviews... Initializing the list...`
      );
      restaurant.reviews = [];
    }
    const finalReviewObject = this.BuildFinalReview(restaurant);
    restaurant.reviews.push(finalReviewObject);
    return finalReviewObject;
  }
  /**
   *
   */
  BuildFinalReview(restaurant) {
    return {
      name: this.reviewInstance.author,
      rating: this.reviewInstance.ratingValue,
      comments: this.reviewInstance.reviewDesc,
      restaurant_id: restaurant.id
    };
  }
  /**
   * Handle the reply of the API.
   * If the API call failed, we still have the complete restaurant object.
   * True means we can tell that the user that the review was saved.
   * False means we will save the review using background sync.
   * @param {restaurant} restaurant
   * @param {review} newReview
   */
  ProcessApiResponse(restaurant, newReview) {
    return saveNewReview(newReview)
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
    if (!apiResult.status) {
      console.warn(
        "The review wasn't save by the API... Caching it for background sync..."
      );
      this.SaveReviewInSpecificCacheFor(restaurant, this.reviewInstance);
    }

    return {
      status: apiResult.status,
      restaurant: restaurant,
      review: apiResult.review ? apiResult.review : this.reviewInstance
    };
  }
  /**
   * Cache the review for a given restaurant
   * @param {Restaurant} restaurant
   * @param {Review} review
   */
  SaveReviewInSpecificCacheFor(restaurant, review) {
    cacheReview(restaurant, review);
  }
}
