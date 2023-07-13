describe("Fetches items on scroll", () => {
    it("Fetches data", () => {
        //Load the application and check if loadingComponent works
        cy.visit("http://localhost:5173/");
        cy.get(".CYloadingComponent").should("be.visible");

        cy.window().scrollTo("top");
        //Check if card count is 20
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/character/?page=1&name="
        ).as("requestOne");
        cy.wait("@requestOne");
        cy.get(".CYcard").should("have.length", 20);

        //Scroll to bottom to load more
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/character/?page=2&name="
        ).as("requestTwo");
        cy.window().scrollTo("bottom", { duration: 600 });

        //Check if card count is 40
        cy.get(".CYloadingComponent").should("be.visible");
        cy.wait("@requestTwo");
        cy.get(".CYcard").should("have.length", 40);

        //Scroll to bottom once more
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/character/?page=3&name="
        ).as("requestThree");
        cy.window().scrollTo("bottom", { duration: 600 });

        //Check if card count is 60
        cy.get(".CYloadingComponent").should("be.visible");
        cy.wait("@requestThree");
        cy.get(".CYcard").should("have.length", 60);
    });
});
