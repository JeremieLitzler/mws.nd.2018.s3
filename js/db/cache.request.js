const restaurantDb = new idbKeyval.Store("restaurants", "restaurants-db");
const reviewsDb = new idbKeyval.Store("reviews", "reviews-db");
const offlineReviewsDb = new idbKeyval.Store(
  "offlineReviews",
  "oflline-reviews-db"
);

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
function getCachedOfflineReview(key) {
  return idbKeyval.get(key, offlineReviewsDb);
}
function getCachedReviews(restaurantId) {
  return getCacheItem(restaurantId, reviewsDb);
}
function cacheReviews(restaurantId, reviews) {
  return idbKeyval.set(restaurantId, reviews, reviewsDb);
}
function removeCacheItem(key, targetDb = restaurantDb) {
  return idbKeyval.del(key, targetDb);
}

function cacheReview(restaurantId, review) {
  //read cached review to check the restaurant is present
  return getCacheItem(restaurantId, reviewsDb)
    .then(cachedReviews => {
      if (cachedReviews == undefined) {
        //if not present, add a new record with a list of 1 review.
        return cacheReviews(restaurantId, [review]);
      }

      //if present, update the current list
      cachedReviews.push(review);
      return cacheReviews(restaurantId, cachedReviews);
    })
    .catch(err => {
      throw new Error(`Cannot read key in reviews db => `, err);
    });
}

function cacheOfflineReview(guid, review) {
  return idbKeyval.set(`review-${guid}`, review, offlineReviewsDb);
}

function getOfflineReview(key) {
  return getCacheItem(key, offlineReviewsDb);
}
function removeOfflineReview(key) {
  return removeCacheItem(key, offlineReviewsDb);
}

function generateGuid() {
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
