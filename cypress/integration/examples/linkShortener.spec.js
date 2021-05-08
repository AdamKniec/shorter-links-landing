describe("Shortener component", () => {
  it("Should add the list item and data to localStorage", () => {
    cy.visit("https://elated-tereshkova-84fd29.netlify.app"); //Live server extension address
    cy.clearLocalStorage("linksData");
    cy.get("#url-input").type("https://facebook.com");
    cy.get("#form-submit-button").click();

    cy.contains(".shortener-component__list-item", "https://facebook.com", {
      timeout: 40000,
    }).then(() => {
      const localStorageData = localStorage.getItem("linksData");
      const linksData = JSON.parse(localStorageData);
      expect(linksData).not.to.eq(undefined);
      expect(linksData[0].inputValue).to.eq("https://facebook.com");
    });

    // validation mesasge should not be visible
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
