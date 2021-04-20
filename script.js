(function () {
  const submitButton = document.getElementById("form-submit-button");
  const urlInput = document.getElementById("url-input");
  const linksList = document.getElementById("url-list");
  const validationMessage = document.getElementById("validationMesage");

  const correctUrlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  const validateInputUrl = (url) => correctUrlPattern.test(url);

  const handleValidationFailed = () => {
    urlInput.classList.add("shortener-component__input--validation-failed");
    validationMessage.classList.remove(
      "shortener-component__validation-message--hidden"
    );
  };

  const generateListElement = (inputUrl, shortenedLink) => {
    return `
    <li class="shortener-component__list-item">
        ${inputUrl}
      <div>
        <a href=${shortenedLink} class="shortener-component__short-link">${shortenedLink}</a>
        <button class="shortener-component__copy-button">Copy</button>
      </div>
    </li>`;
  };

  const getTheShortenedUrl = (inputValue) => {
    return fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
      .then((response) => response.json())
      .then((data) => data);
  };

  const addLinkListItem = (userInputLink, shortenedLink) => {
    const itemToBeAppended = generateListElement(userInputLink, shortenedLink);
    linksList.insertAdjacentHTML("afterbegin", itemToBeAppended);
  };

  const handleSucessfulFormSubmit = (inputValue) => {
    getTheShortenedUrl(inputValue).then((data) => {
      if (data.result) {
        addLinkListItem(inputValue, data.result.short_link);
      }
    });
    urlInput.classList.remove("shortener-component__input--validation-failed");
    validationMessage.classList.add(
      "shortener-component__validation-message--hidden"
    );
    urlInput.value = "";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateInputUrl(urlInput.value)) {
      handleSucessfulFormSubmit(urlInput.value);
    } else {
      handleValidationFailed();
    }
  };

  submitButton.addEventListener("click", handleFormSubmit);
})();
