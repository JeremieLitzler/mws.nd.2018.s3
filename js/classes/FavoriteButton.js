const IS_FAVORITE_CLASS = "is-favorite";
const ISNT_FAVORITE_CLASS = "isnt-favorite";

class FavoriteButton {
  constructor(favoriteButton) {
    this.TheElement =
      favoriteButton == null || favoriteButton == undefined
        ? document.querySelector(".js-manage-favorite")
        : favoriteButton;
  }

  SetDefault() {
    this.UpdateAsNotFavorite();
  }

  ReadSingle() {
    this.TheElement = document.querySelector(".js-manage-favorite");
    return this;
  }

  UpdateAsNotFavorite() {
    this.TheElement.classList.remove(IS_FAVORITE_CLASS);
    this.TheElement.classList.add(ISNT_FAVORITE_CLASS);
    this.TheElement.textContent = "Set as your favorite";
  }

  UpdateAsFavorite() {
    this.TheElement.classList.remove(ISNT_FAVORITE_CLASS);
    this.TheElement.classList.add(IS_FAVORITE_CLASS);
    this.TheElement.textContent = "My favorite!";
  }
}
