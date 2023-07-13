describe("Check details component", () => {
    it("Error component should load when request fails", () => {
        cy.visit("http://localhost:5173/");
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/character/?page=1&name="
        ).as("localhost");
        cy.wait("@localhost");
        cy.get(".CYsearch").should("be.visible");

        cy.get(".CYsearch").type("cluster");
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/character/?page=1&name=cluster"
        ).as("requestCluster");
        cy.wait("@requestCluster");
        cy.get(".CYcard").should("have.length", 1);
        cy.get(".CYnote").should("be.visible");

        //Check location and episode [error and warning] text work
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/location/2",
            (req) => {
                req.reply({
                    statusCode: 500,
                    body: {
                        error: "Something went wrong",
                    },
                });
            }
        ).as("locationRequest");
        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/location/2",
            (req) => {
                req.reply({
                    statusCode: 500,
                    body: {
                        error: "Something went wrong",
                    },
                });
            }
        ).as("locationRequest");

        cy.intercept(
            "GET",
            "https://rickandmortyapi.com/api/episode/27",
            (req) => {
                req.reply({
                    statusCode: 500,
                    body: {
                        error: "Something went wrong",
                    },
                });
            }
        ).as("episodeRequest");

        cy.get("button").contains("Learn more...").click();
        cy.get(".CYDetails").scrollTo("bottom");

        cy.wait("@locationRequest");
        cy.wait("@episodeRequest");

        //Error component is visible
        cy.get(".CYerrorComponent")
            .contains(
                "Could not fetch data on dimension and residents. Try refreshing."
            )
            .should("be.visible");
        cy.get(".CYerrorComponent")
            .contains("Could not load episodes at this point. Try refreshing.")
            .should("be.visible");
    });
});
