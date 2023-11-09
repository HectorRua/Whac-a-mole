describe("whac-a-mole end2end tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Check if there is the title", () => {
    //There is title
    cy.get(".home-title-text").should("have.length", 1);
  });

  it("Check error when player name is empty", () => {
    //There isn't error
    cy.get("[data-testid=text-input-error]").should("have.length", 0);

    //Click play button
    cy.get("[data-testid=play-button]").click();

    //There is error
    cy.get("[data-testid=text-input-error]").should("have.length", 1);

    //Type PlayerName in text input
    cy.get("[data-testid=text-input]").type("PlayerName");

    //There isn't error
    cy.get("[data-testid=text-input-error]").should("have.length", 0);
  });

  it("Check play button works with player name", () => {
    //Type PlayerName in text input
    cy.get("[data-testid=text-input]").type("PlayerName");

    //Click play button
    cy.get("[data-testid=play-button]").click();

    cy.url().should("include", "/game");
  });
});
