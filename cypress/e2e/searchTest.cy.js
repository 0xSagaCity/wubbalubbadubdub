describe("Search items", () => {
    it("Searches data", () => {
        //Check if Search bar loads
        cy.visit("http://localhost:5173/");
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/character/?page=1&name="
        ).as("localhost");
        cy.wait("@localhost");
        cy.get(".CYsearch").should("be.visible");

        //Get single search result
        cy.get(".CYsearch").type("cluster");
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/character/?page=1&name=cluster"
        ).as("requestCluster");
        cy.wait("@requestCluster");
        cy.get(".CYcard").should("have.length", 1);
        cy.get("span").contains("6 - Abadango Cluster Princess");
    });
});
