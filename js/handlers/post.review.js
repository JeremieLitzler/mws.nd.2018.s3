const saveReview = document.querySelector(".js-save-review");

if (saveReview) {
  saveReview.addEventListener("click", () => {
    if (FormValidator.IsValid()) {
      new ReviewSaver().Save();
      return;
    }

    console.log("Review not saved...");
  });
}
