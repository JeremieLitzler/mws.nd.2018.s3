class FormValidator {
  static IsValid() {
    var ratingOk = new RatingValidator().IsValid();
    var authorOk = new AuthorValidator().IsValid();
    var reviewOk = new ReviewDescValidator().IsValid();

    console.log(
      `Rating is ${ratingOk}, author is ${authorOk} and review is ${reviewOk}`
    );
    return ratingOk && authorOk && reviewOk;
  }
}
