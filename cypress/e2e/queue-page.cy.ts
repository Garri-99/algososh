describe("string page works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
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
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          .and("contain", "");
        cy.get('[data-testid="head"]').should("not.contain", "head");
        cy.get('[data-testid="tail"]').should("not.contain", "tail");
      });

    cy.wait(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("contain", 3);
        cy.get('[data-testid="head"]').should("contain", "head");
        cy.get('[data-testid="tail"]').should("contain", "tail");
      });

    cy.get("input").type("2");
    cy.get("@addBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          .and("contain", "");
        cy.get('[data-testid="head"]').should("not.contain", "head");
        cy.get('[data-testid="tail"]').should("not.contain", "tail");
      });

    cy.wait(1000);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("contain", 2);
        cy.get('[data-testid="head"]').should("contain", "");
        cy.get('[data-testid="tail"]').should("contain", "tail");
      });

    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("contain", 3);
        cy.get('[data-testid="head"]').should("contain", "head");
        cy.get('[data-testid="tail"]').should("contain", "");
      });
  });

  it("delete works correctly", () => {
    cy.get("input").type("3");
    cy.get("@addBtn").click();

    cy.wait(2000);
    cy.get("input").type("2");
    cy.get("@addBtn").click();

    cy.wait(2000);
    cy.get("@dltBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          .and("contain", "3");
        cy.get('[data-testid="head"]').should("contain", "head");
      });

    cy.wait(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("contain", "");
        cy.get('[data-testid="head"]').should("contain", "");
      });
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]').should("contain", "2");
        cy.get('[data-testid="head"]').should("contain", "head");
      });

    cy.get("@dltBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          .and("contain", "2");
      });

    cy.wait(1000);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("contain", "");
        cy.get('[data-testid="head"]').should("contain", "head");
        cy.get('[data-testid="tail"]').should("contain", "");
      });
  });

  it("clean works correctly", () => {
    cy.get("input").type("3");
    cy.get("@addBtn").click();

    cy.wait(2000)
    cy.get("input").type("2");
    cy.get("@addBtn").click();

    cy.wait(2000)
    cy.get("input").type("1");
    cy.get("@addBtn").click();

    cy.wait(2000)
    cy.get("@cleanBtn").click();
    cy.get('[data-testid="core"]').each(($el) => {
      cy.wrap($el).should('contain', '')
    })
  })
});
