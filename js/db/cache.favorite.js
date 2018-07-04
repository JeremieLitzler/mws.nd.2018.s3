/**
 * The need is to be able to add 1 or many restaurants as favorite
 * A favorite is the id of restaurant. A same user can have multiple favorite
 */

const favoritesDb = new idbKeyval.Store("myFavorites", "favorites-db");

function setRestaurantAsFavorite(restaurant) {
  return idbKeyval.set(restaurant.id, true, favoritesDb);
}
function unsetRestaurantAsFavorite(restaurant) {
  return idbKeyval.del(restaurant.id, favoritesDb);
}
function isRestaurantAFavorite(restaurantId) {
  return idbKeyval
    .get(restaurantId, favoritesDb)
    .then(result => {
      const response = { isFavorite: result, restaurantId: restaurantId };
      return response;
    })
    .catch(err => {
      if (DEBUG) console.error("Error in isRestaurantAFavorite", err);
      return false;
    });
}
function readAllFavoriteRestaurants() {
  return idbKeyval.getAll(favoritesDb);
}