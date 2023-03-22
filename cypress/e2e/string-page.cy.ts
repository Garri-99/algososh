describe("string page works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("the button should be inactive when the string is empty", () => {
    cy.get("input").should("have.value", "");
    cy.get("button").should("be.disabled");
  });

  it("animation works correctly", () => {
    cy.get("input").type("123");
    cy.contains("Развернуть").click();

    cy.get('[data-testid="core"]').as("cores");

    cy.get("@cores").eq(0).should("contain", "1");
    cy.get("@cores").eq(1).should("contain", "2");
    cy.get("@cores").eq(2).should("contain", "3");

    cy.wait(1000);
    cy.get("@cores")
      .eq(0)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .and("contain", "1");
    cy.get("@cores")
      .eq(1)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .and("contain", "2");
    cy.get("@cores")
      .eq(2)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .and("contain", "3");

    cy.wait(2000);
    cy.get("@cores")
      .eq(0)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .and("contain", "3");
    cy.get("@cores")
      .eq(1)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .and("contain", "2");
    cy.get("@cores")
      .eq(2)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .and("contain", "1");
  });
});
