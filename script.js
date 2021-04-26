(function () {
  const submitButton = document.getElementById("form-submit-button");
  const urlInput = document.getElementById("url-input");
  const linksList = document.getElementById("url-list");
  const validationMessage = document.getElementById("validationMesage");
  const spinner = document.getElementById("spinner");
  const buttonLabel = document.getElementById("button-label");

  let linksToBeSaved = [];

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
      <div><p>${inputUrl}</p></div> 
      <div>
        <a href=${shortenedLink} class="shortener-component__short-link">${shortenedLink}</a>
        <button class="shortener-component__copy-button">Copy</button>
      </div>
    </li>`;
  };

  const getTheShortenedUrl = (inputValue) => {
    return fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  };

  const addLinkListItem = (userInputLink, shortenedLink) => {
    const itemToBeAppended = generateListElement(userInputLink, shortenedLink);
    linksList.insertAdjacentHTML("afterbegin", itemToBeAppended);
  };

  const handleSucessfulFormSubmit = (inputValue) => {
    spinner.classList.add("visible");
    buttonLabel.textContent = "";
    getTheShortenedUrl(inputValue).then((data) => {
      if (data.result) {
        addLinkListItem(inputValue, data.result.short_link);
        linksToBeSaved = [
          ...linksToBeSaved,
          { inputValue, shortLink: data.result.short_link },
        ];
        localStorage.setItem("linksData", JSON.stringify(linksToBeSaved));
        spinner.classList.remove("visible");
        buttonLabel.textContent = "Shorten it!";
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

  const renderLocalStorageData = () => {
    const dataToBeRendered = localStorage.getItem("linksData");
    linksToBeSaved = [...JSON.parse(dataToBeRendered)];
    JSON.parse(dataToBeRendered).forEach((element) => {
      addLinkListItem(element.inputValue, element.shortLink);
    });
  };

  const handleCopyButtonClick = (e) => {
    const copyButtons = document.querySelectorAll(
      ".shortener-component__copy-button"
    );
    copyButtons.forEach((button) => {
      button.classList.remove("test");
      button.textContent = "Copy";
    });
    if (e.srcElement.className === "shortener-component__copy-button") {
      const link = e.target.parentElement.firstElementChild.textContent;

      e.target.classList.add("test");
      e.target.textContent = "Copied!";
      navigator.clipboard
        .writeText(link)
        .then(() => console.log("Copied successfully!"))
        .catch((err) => console.log(err));
    }
  };

  submitButton.addEventListener("click", handleFormSubmit);
  window.addEventListener("load", renderLocalStorageData);
  linksList.addEventListener("click", (e) => handleCopyButtonClick(e));
})();
