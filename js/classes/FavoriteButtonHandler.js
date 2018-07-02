class FavoriteButtonHandler {
  BuildExtendedRestaurantObj(alreadyFavoriteResponse) {
    return {
      isFavorite: alreadyFavoriteResponse.isFavorite,
      restaurantPromise: fetchRestaurant(alreadyFavoriteResponse.restaurantId)
    };
  }
  LoadCurrentState() {
    const favoriteButton = new FavoriteButton();

    this.ReadCurrentState().then(response => {
      if (response.isFavorite) {
        favoriteButton.ReadSingle().UpdateAsFavorite();
        return;
      }

      favoriteButton.SetDefault();
    });
  }

  UpdateState(favoriteButtonElement) {
    const favoriteButton = new FavoriteButton(favoriteButtonElement);
    this.ReadCurrentState().then(response => {
      if (!response.isFavorite) {
        return response.restaurantPromise.then(restaurant => {
          setRestaurantAsFavorite(restaurant);
          favoriteButton.UpdateAsFavorite();
        });
      }

      return response.restaurantPromise.then(restaurant => {
        unsetRestaurantAsFavorite(restaurant);
        favoriteButton.SetDefault();
      });
    });
  }
  ReadCurrentState(favoriteButton) {
    if (this.favoriteButton == null) this.favoriteButton = favoriteButton;

    const restaurantId = new RestaurantPage().getRestaurantId();
    return isRestaurantAFavorite(restaurantId)
      .then(result => {
        return this.BuildExtendedRestaurantObj(result);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
