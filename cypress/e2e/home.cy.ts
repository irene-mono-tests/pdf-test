beforeEach(() => {
  cy.visit("http://localhost:3002");
});

describe("Home Page", () => {
  it("should find `Get started by`", () => {
    //Get started by
    cy.get("p").contains("Get started by");
  });
});

export {};
