describe("Shortener component", () => {
  it("Should add the list item and data to localStorage", () => {
    cy.visit("http://127.0.0.1:5500"); //Live server extension address

    cy.get("#url-input").type("https://facebook.com");
    cy.get("#form-submit-button").click();

    // wait for the api response and make sure that the value has been added to the localStorage
    cy.wait(40000).should(() => {
      const localStorageData = localStorage.getItem("linksData");
      if (JSON.parse(localStorageData)) {
        expect(JSON.parse(localStorageData)[0].inputValue).to.eq(
          "https://facebook.com"
        );
      }
    }); //todo - wait for the api response instead of hardcoding the wait time

    // check if the new list item with the corrct value has been addded
    cy.get(".shortener-component__list-item")
      .contains("https://facebook.com")
      .should("be.visible");

    //validation mesasge should not be visible
    cy.get("#validationMesage")
      .contains("Please add a valid link")
      .should("not.be.visible");
  });

  it("Should see the validation messgae under the input when the URL is not correct", () => {
    cy.get("#url-input").type("totallyNotACorrectUrl1234");
    cy.get("#form-submit-button").click();

    cy.get("#validationMesage")
      .contains("Please add a valid link")
      .should("be.visible");
  });
});
