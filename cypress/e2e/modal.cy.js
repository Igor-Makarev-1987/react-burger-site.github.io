describe('modal window tests', function () {
    it('should be opened and closed by clicking', () => {
        cy.visit('http://localhost:3000');
        cy.get("[data-cy='Краторная булка N-200i title-ingridient']").click({force: true});
        cy.get("[data-cy='title']").should("have.text", "Детали ингридиента");
        cy.get("[data-cy='ingredient title']").should("have.text", "Краторная булка N-200i");
        cy.get("[data-cy='close']").first().click();
        // cy.get("[data-cy='close-overlay']").should("have.text", "text");
        // cy.get("[data-cy='close-overlay']").click();
        cy.get("[data-cy='constructor title']").should("have.text", "Соберите бургер");
    })
})