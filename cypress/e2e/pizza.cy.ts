beforeEach(() => {
  cy.visit("http://localhost:3002/pizza");
});

describe("Pizza Page", () => {
  it("checks toppings", () => {
    const pizzaToppings = [
      "barbecue",
      "mushroom",
      "cheese",
      "suya",
      "pepperoni",
      "plantain",
    ];
    //Get started by
    cy.get(".topping").each((item, index) => {
      cy.wrap(item).should("contain.text", pizzaToppings[index]);
    });
  });
});

export {};
