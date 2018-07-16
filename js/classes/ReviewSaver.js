class ReviewSaver {
  constructor() {
    this.ratingElem = document.querySelector(".selected-rating");
    this.authorElem = document.querySelector("#author");
    this.reviewDescElem = document.querySelector("#review-desc");
    this.reviewInstance = new Review();
  }
  Save() {
    this.InitializeSubmitFeedback();
    this.ReadFormToFillReviewInstance();
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
      feedbackMessage = `${feedbackMessage} 
        "Ouch, couldn't connect to the server. But do not despair: your review has been saved in your browser so once you connect your device to a Wifi or mobile network, it will be sent automatically to the server.`;
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
        const newReview = this.BuildFinalReview(restaurant);
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

        if (
          finalResponse.reviews == null ||
          finalResponse.reviews == undefined
        ) {
          throw new Error(
            "There must always be at least one review at this point!"
          );
        }

        const reviewContainer = new RestaurantPage().readReviewsContainer();
        new RestaurantPage().bindReviewListElement(
          reviewContainer,
          finalResponse.reviews
        );
        this.DisplaySubmissionEndNotification(finalResponse);
      })
      .catch(err => {
        //any other error not handled
        console.error("Check the error stack", err);
      });
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
        return this.BuildResponseObject(apiResult, restaurant)
          .then(reviews => {
            return {
              status: apiResult.status,
              restaurant: restaurant,
              reviews: reviews
            };
          })
          .catch(err => {
            console.error(
              "Unhandled error after BuildResponseObject. Check call stack",
              err
            );
          });
      })
      .catch(err => {
        console.error(
          "Unhandled error after saveNewReview. Check call stack",
          err
        );
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
      this.SaveReviewInSpecificCacheFor(
        restaurant,
        this.BuildFinalReview(restaurant)
      ).then(result => {
        return fetchReviews(restaurant.id);
      });
    }

    return fetchReviews(restaurant.id);
  }
  /**
   * Cache the review for a given restaurant
   * @param {Restaurant} restaurant
   * @param {Review} review
   */
  SaveReviewInSpecificCacheFor(restaurant, review) {
    return cacheReview(restaurant.id, review);
  }
}
