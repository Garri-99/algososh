describe("string page works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("the button should be inactive when the string is empty", () => {
    cy.get("input").should("have.value", "");
    cy.get("button").should("be.disabled");
  });

  it("animation works correctly", () => {
    cy.get("input").type("3");
    cy.contains("Рассчитать").click();

    cy.get('[data-testid="core"]').as("cores");

    cy.get("@cores").eq(0).should("contain", "1");
    cy.get("@cores").eq(1).should("contain", "1");
    cy.get("@cores").eq(2).should("contain", "2");
    cy.get("@cores").eq(3).should("contain", "3");
  });
});
