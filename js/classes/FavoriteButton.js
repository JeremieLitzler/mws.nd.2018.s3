const IS_FAVORITE_CLASS = "is-favorite";
const ISNT_FAVORITE_CLASS = "isnt-favorite";
const START_CLASS = "star";

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
    this.RemoveStarSvg();
    this.TheElement.textContent = "Set as your favorite";
  }

  UpdateAsFavorite() {
    this.TheElement.classList.remove(ISNT_FAVORITE_CLASS);
    this.TheElement.classList.add(IS_FAVORITE_CLASS);
    const starImgElement = document.createElement("img");
    starImgElement.className = START_CLASS;
    starImgElement.tabIndex = 0;
    starImgElement.src = "./img/icons/fa/star-full.svg";
    const isMyFavoriteText = "This restaurant is my restaurant";
    starImgElement.alt = isMyFavoriteText;
    starImgElement.title = isMyFavoriteText;
    this.TheElement.textContent = "";
    this.TheElement.appendChild(starImgElement);
  }
  RemoveStarSvg() {
    const starImgElement = document.querySelector(`.${START_CLASS}`);
    if (starImgElement != null) {
      this.TheElement.removeChild(starImgElement);
    }
  }
}
