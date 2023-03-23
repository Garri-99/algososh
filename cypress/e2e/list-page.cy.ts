describe("string page works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
    cy.get('[placeholder="Введите текст"]').as("txtInput");
    cy.get('[placeholder="Введите индекс"]').as("indxInput");
    cy.contains("Добавить в head").as("addToHeadBtn");
    cy.contains("Добавить в tail").as("addToTailBtn");
    cy.contains("Добавить по индексу").as("addByIndexBtn");
    cy.contains("Удалить из head").as("dltFromHeadBtn");
    cy.contains("Удалить из tail").as("dltFromTailBtn");
    cy.contains("Удалить по индексу").as("dltByIndexBtn");
  });

  it("buttons should be inactive when inputs are empty", () => {
    cy.get("@txtInput").should("have.value", "");
    cy.get("@indxInput").should("have.value", "");
    cy.get("@addToHeadBtn").should("be.disabled");
    cy.get("@addToTailBtn").should("be.disabled");
    cy.get("@addByIndexBtn").should("be.disabled");
    cy.get("@dltByIndexBtn").should("be.disabled");
  });

  it("the initial list is displayed correctly", () => {
    cy.get('[data-testid="circle"]').as("elements");
    cy.get("@elements")
      .eq(0)
      .should("contain", "b")
      .and("contain", "0")
      .and("contain", "head");
    cy.get("@elements").eq(1).should("contain", "a").and("contain", "1");
    cy.get("@elements").eq(2).should("contain", "r").and("contain", "2");
    cy.get("@elements").eq(3).should("contain", "e").and("contain", "3");
    cy.get("@elements")
      .eq(4)
      .should("contain", "v")
      .and("contain", "4")
      .and("contain", "tail");
  });

  it("add to head works correctly", () => {
    cy.get("@txtInput").type("test");
    cy.get("@addToHeadBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "test");
      });

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 6)
      .eq(0)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "head");
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(127, 224, 81)")
          .and("contain", "test");
      });
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("contain", "b")
      .and("contain", "1")
      .and("not.contain", "head");

    cy.wait(500);
    cy.get('[data-testid="core"]')
      .eq(0)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("add to tail works correctly", () => {
    cy.get("@txtInput").type("test");
    cy.get("@addToTailBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "test");
      });

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 6)
      .eq(5)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("have.css", "border", "4px solid rgb(127, 224, 81)")
          .and("contain", "test");
        cy.get('[data-testid="index"]').should("contain", 5);
        cy.get('[data-testid="tail"]').should("contain", "tail");
      });
    cy.get('[data-testid="circle"]')
      .eq(4)
      .should("contain", "v")
      .and("not.contain", "tail");

    cy.wait(500);
    cy.get('[data-testid="core"]')
      .eq(5)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("add by index works correctly", () => {
    cy.get("@txtInput").type("test");
    cy.get("@indxInput").type("2");
    cy.get("@addByIndexBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "test");
      });

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "test");
      });
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "head");
        cy.get('[data-testid="core"]').should(
          "have.css",
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "test");
      });
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "");
        cy.get('[data-testid="core"]').should(
          "have.css",
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 6)
      .eq(2)
      .within(() => {
        cy.get('[data-testid="core"]')
          .should("contain", "test")
          .and("have.css", "border", "4px solid rgb(127, 224, 81)");
        cy.get('[data-testid="index"]').should("contain", "2");
      });
    cy.get('[data-testid="circle"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="core"]').should(
          "have.css",
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="core"]').should(
          "have.css",
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });

    cy.wait(500);
    cy.get('[data-testid="core"]')
      .eq(2)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("delete from head works correctly", () => {
    cy.get("@dltFromHeadBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="core"]').should("contain", "");
        cy.get('[data-testid="tail"]').should("contain", "b");
      });

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 4)
      .eq(0)
      .within(() => {
        cy.get('[data-testid="core"]').should("contain", "a");
        cy.get('[data-testid="head"]').should("contain", "head");
      });
  });

  it("delete from tail works correctly", () => {
    cy.get("@dltFromTailBtn").click();

    cy.wait(0);
    cy.get('[data-testid="circle"]')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="core"]').should("contain", "");
        cy.get('[data-testid="tail"]').should("contain", "v");
      });

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 4)
      .eq(3)
      .within(() => {
        cy.get('[data-testid="core"]').should("contain", "e");
        cy.get('[data-testid="tail"]').should("contain", "tail");
      });
  });

  it("delete by index works correctly", () => {
    cy.get("@indxInput").type("2");
    cy.get("@dltByIndexBtn").click();

    cy.wait(0);
    cy.get('[data-testid="core"]')
      .eq(0)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(500);
    cy.get('[data-testid="core"]')
      .eq(1)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(500);
    cy.get('[data-testid="core"]')
      .eq(2)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(500);
    cy.get('[data-testid="circle"]')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="core"]').should("contain", "");
        cy.get('[data-testid="tail"]').should("contain", "r");
        cy.get('[data-testid="index"]').should("contain", "2");
      });

    cy.wait(500);
    cy.get('[data-testid="core"]')
      .should("have.length", 4)
      .each(($el) => {
        cy.wrap($el).should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
  });
});
