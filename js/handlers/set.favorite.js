const favoriteElements = document.querySelectorAll(".js-manage-favorite");

if (favoriteElements != null || favoriteElements != undefined) {
  favoriteElements.forEach(favoriteButton => {
    /*favoriteButton.addEventListener("DOMContentLoaded", event => {
      new FavoriteButton().Update(favoriteButton);
    });*/
    favoriteButton.addEventListener("click", event => {
      new FavoriteButtonHandler().UpdateState(favoriteButton);
    });

    favoriteButton.addEventListener("keydown", event => {
      if (event.keyCode == 13) {
        new FavoriteButtonHandler().UpdateState(favoriteButton);
      }
    });
  });
}
