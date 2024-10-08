describe('drag and drop tests', () => {
    beforeEach(() => {
        cy.intercept("GET", "api/auth/user", {fixture: "user"})
        cy.intercept("GET", "api/ingredients", {fixture: "ingridients"})
        cy.intercept("POST", "api/orders", {fixture: "order"})

        localStorage.setItem("accessToken", "sdfsdfdsfdsf");
        
        cy.visit('http://localhost:3000/');
      });

    it('should be available to drag and drop and take an order', () => {
        // cy.wait(3000);
        // это отрабатывает
        cy.get("[data-cy='constructor title']").should("have.text", "Соберите бургер");
     
        cy.get("[data-cy='Краторная булка N-200i title-ingridient']").trigger("dragstart");
        cy.get("[data-cy='constructor']").trigger("drop");
        cy.get("[data-cy='Краторная булка N-200i counter']").should('have.text', "2"); // 1
        // cy.get(".constructor-ingredient-data-cy").contains("Краторная булка N-200i");

        cy.get("[data-cy='Биокотлета из марсианской Магнолии title-ingridient']").trigger("dragstart");
        cy.get("[data-cy='constructor']").trigger("drop");
        cy.get("[data-cy='Биокотлета из марсианской Магнолии counter']").should("have.text", ""); // 1
        
        cy.get("[data-cy='make-an-order-info']").should("have.text", "Оформить заказ");
        cy.get("[data-cy='make-an-order-info'] button").click({force: true});
        
        // cy.get("[data-cy='order-load2']").should("have.text", "идентификатор заказа");
        cy.get("[data-cy='order-load']").should("have.text", "Ваш заказ начали готовить");
    })
})