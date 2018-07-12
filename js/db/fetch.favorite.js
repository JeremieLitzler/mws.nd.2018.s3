/**
 * The need is to be able to add 1 or many restaurants as favorite
 * A favorite is the id of restaurant. A same user can have multiple favorite
 */
function setRestaurantFavoriteFlag(restaurant, isFavorite = true) {
  const apiUrl = `${BASE_API_URL}/restaurants/${
    restaurant.id
  }/?is_favorite=${isFavorite}`;
  const fetchParams = {
    method: "PUT",
    "content-type": "application/json"
  };

  return fetch(apiUrl, fetchParams)
    .then(function(response) {
      if (response.ok) {
        const jsonData = response.json();
        if (DEBUG) console.log(jsonData);
        return jsonData;
      }
      if (DEBUG) console.log("Fetch failed response", response);
    })
    .then(restaurant => {
      return updateCacheBeforeReturning(restaurant);
    })
    .catch(err => {
      console.error(
        "In setRestaurantFavoriteFlag, fail to save to API =>",
        err
      );
      return null;
    });
}
