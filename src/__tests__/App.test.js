import React from "react";
import { render } from "@testing-library/react";
import { MockProvider } from "@rest-hooks/test";
import SpeciesListResource from "../pokedex/resources/SpeciesList";
import App from "../App";

jest.mock("../pokedex/Species", () => ({ name }) => <div>{name}</div>);

const fixtures = {
  loading: [],
  withInitialData: [
    {
      request: SpeciesListResource.listShape(),
      params: {},
      result: {
        count: 807,
        next: null,
        previous: null,
        results: [
          {
            name: "bulbasaur"
          }
        ]
      }
    }
  ]
};

describe("Species unit tests", () => {
  it("Renders the species when the resource is fetched", async () => {
    const tree = (
      <MockProvider results={fixtures.withInitialData}>
        <App />
      </MockProvider>
    );
    const { asFragment, findByText } = render(tree);
    const species = await findByText("bulbasaur");
    expect(species).toBeDefined();

    expect(asFragment()).toMatchSnapshot();
  });
});
