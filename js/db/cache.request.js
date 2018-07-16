const restaurantDb = new idbKeyval.Store("restaurants", "restaurants-db");
const reviewsDb = new idbKeyval.Store("reviews", "reviews-db");

function retrieveKeys(targetDb = restaurantDb) {
  return idbKeyval.keys(targetDb);
}

function cacheItems(items) {
  items.forEach(item => {
    cacheItem(item);
  });
}
function cacheItem(item) {
  //console.log(`About to cache the item which id is ${item.id}`);
  return idbKeyval.set(item.id, item, restaurantDb);
}
function getCacheItem(key, targetDb = restaurantDb) {
  return idbKeyval.get(key, targetDb);
}
function getCachedReviews(restaurantId) {
  return getCacheItem(restaurantId, reviewsDb);
}
function cacheReviews(restaurantId, reviews) {
  return idbKeyval.set(restaurantId, reviews, reviewsDb);
}
function cacheReview(restaurantId, review) {
  //read cached review to check the restaurant is present
  return retrieveKeys()
    .then(restaurantIdsWithReview => {
      return doesRestaurantHaveCachedReviews(
        restaurantIdsWithReview,
        restaurantId
      );
    })
    .then(restaurantHasCachedReview => {
      if (!restaurantHasCachedReview) {
        //if not present, add a new record with a list of 1 review.
        return cacheReviews(restaurantId, [review]);
      }

      //if present, update the current list
      return updateCachedRestaurantReviews(restaurantId, review);
    })
    .catch(err => {
      throw new Error(`Cannot read key in reviews db => `, err);
    });
}

function doesRestaurantHaveCachedReviews(reviewsDbKeys, restaurantId) {
  const result = reviewsDbKeys.find(restaurantId => {
    return true;
  });
  return result ? result : false;
}

function updateCachedRestaurantReviews(restaurantId, review) {
  return idbKeyval
    .get(restaurantId, reviewsDb)
    .then(reviews => {
      reviews.push(review);
      return cacheReviews(restaurantId, reviews);
    })
    .catch(err => {
      throw new Error(
        `Cannot read list of reviews for restaurant ${restaurantId} => `,
        err
      );
    });
}
