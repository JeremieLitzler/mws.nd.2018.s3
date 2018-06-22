class AuthorValidator {
  constructor() {
    this.reviewAuthor = document.querySelector("#author");
    this.inputContainer = document.querySelector(".input-author");
    this.validationMessageElement = document.createElement("p");
    this.validationMessageElement.className = "validation-author";
  }
  /**
   * Remove the previous validation element if already set.
   */
  ResetValidationMessageElement() {
    const validationMessageElement = document.querySelector(
      ".validation-author"
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
    if (this.reviewAuthor == null && this.reviewAuthor == undefined) {
      console.error(
        new Error("Something is wrong... Element #author is missing!")
      );
      return false;
    }

    if (IsStringEmpty(this.reviewAuthor.value)) {
      this.PrintNotSetMessage("The author is missing!");
      return false;
    }

    if (IsStringOnlyWhiteSpace(this.reviewAuthor.value)) {
      this.PrintNotSetMessage("Nice try... Do type something!");
      return false;
    }

    //Check the author name is alpha only

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
   * @param {string} message
   */
  PrintNotSetMessage(message) {
    this.validationMessageElement.innerHTML = message;
    this.validationMessageElement.classList.add("validation-ko");
    this.inputContainer.appendChild(this.validationMessageElement);
    this.inputContainer.classList.remove("is-ok");
    this.inputContainer.classList.add("is-ko");
  }
  /**
   * Print out the validation message when input is invalid
   * @param {string} actualValue
   */
  PrintWrongFormatMessage(actualValue) {
    console.error(new Error(`${actualValue} contains illegal characters.`));
  }
}
