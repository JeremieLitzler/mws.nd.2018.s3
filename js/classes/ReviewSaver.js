class ReviewSaver {
  constructor() {
    this.ratingElem = document.querySelector(".selected-rating");
    this.authorElem = document.querySelector("#author");
    this.reviewDescElem = document.querySelector("#review-desc");
    this.reviewInstance = new Review();
  }
  Save() {
    if (this.ratingElem != null) {
      this.reviewInstance.ratingValue = this.ratingElem.innerHTML;
    }
    this.reviewInstance.author = this.authorElem.value;
    this.reviewInstance.reviewDesc = this.reviewDescElem.value;

    //this.reviewInstance.IsValid();
    console.log(this.reviewInstance);
  }
}
