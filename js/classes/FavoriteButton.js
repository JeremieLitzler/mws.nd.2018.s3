const IS_FAVORITE_CLASS = "is-favorite";
const ISNT_FAVORITE_CLASS = "isnt-favorite";
const STAR_CLASS = "star";

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
    this.TheElement.innerHTML = "Save this restaurant in my favorites";
    //const starElement = this.CreateNoFavoriteStar();
    //this.TheElement.appendChild(starElement);
  }

  UpdateAsFavorite() {
    this.TheElement.classList.remove(ISNT_FAVORITE_CLASS);
    this.TheElement.classList.add(IS_FAVORITE_CLASS);
    this.TheElement.innerHTML = "";
    const starElement = this.CreateFavoriteStar();
    this.TheElement.appendChild(starElement);
  }
  CreateFavoriteStar() {
    const starElement = document.createElement("i");
    starElement.innerHTML = `<!-- CREDITS: https://fontawesome.com/license -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>`;
    starElement.className = `${STAR_CLASS}`;
    const isMyFavoriteText = "This restaurant is one of my favorites";
    starElement.title = isMyFavoriteText;
    return starElement;
  }
  CreateNoFavoriteStar() {
    const starElement = document.createElement("i");
    starElement.innerHTML = `<!-- CREDITS: https://fontawesome.com/license -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>`;
    starElement.className = `${STAR_CLASS}`;
    const isMyFavoriteText =
      "Click here this restaurant as one of my favorites";
    starElement.title = isMyFavoriteText;
    return starElement;
  }

  RemoveStarSvg() {
    const starElement = document.querySelector(`.${STAR_CLASS}`);
    if (starElement != null) {
      this.TheElement.removeChild(starElement);
    }
  }
}
