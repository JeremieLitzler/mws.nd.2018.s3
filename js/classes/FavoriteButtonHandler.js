class FavoriteButtonHandler {
  GetFavoriteFlagValueAsBool(isFavoriteStr) {
    return isFavoriteStr === "false" || !isFavoriteStr ? false : true;
  }
  BuildExtendedRestaurantObj(restaurant) {
    return {
      isFavorite: this.GetFavoriteFlagValueAsBool(restaurant.is_favorite),
      restaurantObj: restaurant
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
      const newState = !response.isFavorite;
      return setRestaurantFavoriteFlag(response.restaurantObj, newState)
        .then(restaurant => {
          this.ProcessApiResult(restaurant, favoriteButton);
        })
        .catch(err => {
          console.error("In FavoriteButtonHandler.UpdateState => ", err);
          return false;
        });
    });
  }
  ReadCurrentState(favoriteButton) {
    if (this.favoriteButton == null) this.favoriteButton = favoriteButton;

    const restaurantId = new RestaurantPage().getRestaurantId();
    return fetchRestaurant(restaurantId)
      .then(restaurant => {
        return this.BuildExtendedRestaurantObj(restaurant);
      })
      .catch(err => {
        console.error(err);
      });
  }

  ProcessApiResult(restaurant, favoriteButton) {
    if (restaurant == null) {
      throw new Error("setRestaurantAsFavorite failed");
    }

    const isFavorite = this.GetFavoriteFlagValueAsBool(restaurant.is_favorite);
    if (isFavorite) {
      favoriteButton.UpdateAsFavorite();
    } else {
      favoriteButton.SetDefault();
    }
  }
}
