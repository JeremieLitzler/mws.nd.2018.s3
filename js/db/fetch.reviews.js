function fetchReviews(restaurantId) {
  const DATABASE_URL = `${BASE_API_URL}/reviews/?restaurant_id=${restaurantId}`;
  return fetch(DATABASE_URL)
    .then(function(response) {
      if (response.ok) {
        const jsonData = response.json();
        if (DEBUG) console.log(jsonData);
        return jsonData;
      }
      if (DEBUG) console.log("Fetch failed response", response);
    })
    .then(reviews => {
      cacheReviews(restaurantId, reviews);
      return reviews;
    })
    .catch(err => {
      console.error("Unable to get data from API. Reason: ", err);
      return getCachedReviews(restaurantId);
    });
}

function updateReviewsInCacheBeforeReturning(reviews) {
  return cacheItem(reviews)
    .then(response => {
      if (DEBUG)
        console.log(`Just updated restaurant ${restaurant.id}`, response);
      return reviews;
    })
    .catch(err => {
      console.error(
        `Failed to update the restaurant  ${restaurant.id} in cache`,
        err
      );
      return null;
    });
}

function saveNewReview(review) {
  const DATABASE_URL = `${BASE_API_URL}/reviews`;
  const fetchParams = {
    method: "POST",
    "content-type": "application/json",
    body: JSON.stringify(review)
  };
  const request = new Request(DATABASE_URL, fetchParams);
  return fetch(request, fetchParams)
    .then(function(response) {
      if (response.ok) {
        const jsonData = response.json();
        if (DEBUG) console.log(jsonData);
        return jsonData;
      }
      if (DEBUG) console.log("Fetch failed response", response);
    })
    .then(review => {
      return { status: true, review: review };
    })
    .catch(err => {
      console.error("Unable to save to API. Reason: ", err);
      return {
        status: false,
        review: undefined
      };
    });
}
