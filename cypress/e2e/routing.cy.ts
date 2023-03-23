describe("app works correctly with routes", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open main page by default", () => {
    cy.get("div > a").should("be.visible").and("have.length", 6);
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open string page after string link click", () => {
    cy.get("div > a").eq(0).click();
    cy.contains("Строка");
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open fibonacci page after fibonacci link click", () => {
    cy.get("div > a").eq(1).click();
    cy.contains("Фибоначчи");
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open sorting page after sorting link click", () => {
    cy.get("div > a").eq(2).click();
    cy.contains("Сортировка");
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open stack page after stack link click", () => {
    cy.get("div > a").eq(3).click();
    cy.contains("Стек");
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open queue page after queue link click", () => {
    cy.get("div > a").eq(4).click();
    cy.contains("Очередь");
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open list page after list link click", () => {
    cy.get("div > a").eq(5).click();
    cy.contains("Связный список");
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });
});
