describe("string page works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
    cy.contains("Добавить").as("addBtn");
    cy.contains("Удалить").as("dltBtn");
    cy.contains("Очистить").as("cleanBtn");
  });

  it("the button should be inactive when the string is empty", () => {
    cy.get("input").should("have.value", "");
    cy.get("@addBtn").should("be.disabled");
  });

  it("add works correctly", () => {
    cy.get("input").type("3");
    cy.get("@addBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]').within(() => {
      cy.get('[data-testid="core"]')
        .should("have.css", "border", "4px solid rgb(210, 82, 225)")
        .and("contain", 3);
      cy.get('[data-testid="head"]').should("contain", "top");
      cy.get('[data-testid="index"]').should("contain", 0);
    });

    cy.wait(500);
    cy.get('[data-testid="circle"]').within(() => {
      cy.get('[data-testid="core"]').should(
        "have.css",
        "border",
        "4px solid rgb(0, 50, 255)"
      );
    });

    cy.get("input").type("2");
    cy.get("@addBtn").click();

    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "");
      });
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          .and("contain", 2);
        cy.get('[data-testid="head"]').should("contain", "top");
        cy.get('[data-testid="index"]').should("contain", 1);
      });

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]').should(
          "have.css",
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });
  });

  it("delete works correctly", () => {
    cy.get("input").type("3");
    cy.get("@addBtn").click();
    cy.get("input").type("2");
    cy.get("@addBtn").click();
    cy.get("@dltBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          .and("contain", "2");
        cy.get('[data-testid="head"]').should("contain", "top");
      });
    cy.wait(500);
    cy.get('[data-testid="circle"]').within(() => {
      cy.get('[data-testid="core"]').should("contain", "3");
      cy.get('[data-testid="head"]').should("contain", "top");
    });
  });

  it("clean works correctly", () => {
    cy.get("input").type("3");
    cy.get("@addBtn").click();
    cy.get("input").type("2");
    cy.get("@addBtn").click();
    cy.get("input").type("1");
    cy.get("@addBtn").click();

    cy.get("@cleanBtn").click();
    cy.get('[data-testid="circle"]').should("not.exist");
  });
});
