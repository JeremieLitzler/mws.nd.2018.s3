const restaurantDb = new idbKeyval.Store("restaurants", "restaurants-db");
const offlineReviewsDb = new idbKeyval.Store("reviews", "offline-reviews-db");

function retrieveKeys() {
  return idbKeyval.keys(restaurantDb);
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
function getCacheItem(key) {
  return idbKeyval.get(key, restaurantDb);
}

function cacheReview(restaurant, review) {
  const reviewId = `${restaurant.id}_${restaurant.reviews.length + 1}`;
  return idbKeyval.set(reviewId, review, offlineReviewsDb);
}
