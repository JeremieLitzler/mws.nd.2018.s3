class ReviewDescValidator {
  constructor() {
    this.reviewDesc = document.querySelector("#review-desc");
    this.inputContainer = document.querySelector(".input-review");
    this.validationMessageElement = document.createElement("p");
    this.validationMessageElement.className = "validation-review";
  }
  /**
   * Remove the previous validation element if already set.
   */
  ResetValidationMessageElement() {
    const validationMessageElement = document.querySelector(
      ".validation-review"
    );
    if (validationMessageElement != null) {
      this.inputContainer.removeChild(validationMessageElement);
    }
  }
  /**
   * Check the input is valid
   */
  IsValid() {
    this.ResetValidationMessageElement();
    if (this.reviewDesc == null && this.reviewDesc == undefined) {
      console.error(
        new Error("Something is wrong... Element #review-desc is missing!")
      );
      return false;
    }

    if (IsStringEmpty(this.reviewDesc.value)) {
      this.PrintNotSetMessage(
        "You have not written any review. Please give us some food for thought."
      );
      return false;
    }
    if (IsStringOnlyWhiteSpace(this.reviewDesc.value)) {
      this.PrintNotSetMessage("Nice try... Do type something!");
      return false;
    }

    this.PrintOkMessage();
    return true;
  }
  /**
   * Print out the validation message when input is valid
   */
  PrintOkMessage() {
    this.validationMessageElement.innerHTML = ":)";
    this.validationMessageElement.classList.add("validation-ok");
    this.inputContainer.appendChild(this.validationMessageElement);
    this.inputContainer.classList.remove("is-ko");
    this.inputContainer.classList.add("is-ok");
  }

  /**
   * Print out the validation message when input is empty
   */
  PrintNotSetMessage(message) {
    this.validationMessageElement.innerHTML = message;
    this.validationMessageElement.classList.add("validation-ko");
    this.inputContainer.appendChild(this.validationMessageElement);
    this.inputContainer.classList.remove("is-ok");
    this.inputContainer.classList.add("is-ko");
  }
}
