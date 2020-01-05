import React from "react";
import { render } from "@testing-library/react";
import { MockProvider } from "@rest-hooks/test";
import SpeciesResource from "../resources/Species";
import VarietyResource from "../resources/Variety";
import Species from "../Species";

jest.mock("../Type", () => ({ name }) => <div>{name}</div>);

const fixtures = [
  {
    request: SpeciesResource.detailShape(),
    params: { name: "bulbasaur" },
    result: {
      name: "bulbasaur",
      names: [{ language: { name: "fr" }, name: "Bulbizarre" }],
      pokedex_numbers: [{ pokedex: { name: "national" }, entry_number: 1 }],
      genera: [{ language: { name: "fr" }, genus: "Pokémon Plante" }],
      varieties: [{ pokemon: { name: "bulbasaur2" }, is_default: true }]
    }
  },
  {
    request: VarietyResource.detailShape(),
    params: { name: "bulbasaur2" },
    result: {
      name: "bulbasaur2",
      types: [
        {
          type: { name: "plant" },
          slot: 2
        },
        {
          type: { name: "poison" },
          slot: 1
        }
      ]
    }
  }
];

describe("Species unit tests", () => {
  it("Renders correctly", () => {
    const tree = (
      <MockProvider results={fixtures}>
        <Species name="bulbasaur" />
      </MockProvider>
    );
    const { queryByText, asFragment } = render(tree);

    const name = queryByText("Bulbizarre");
    expect(name).toBeDefined();

    const genus = queryByText("Pokémon Plange");
    expect(genus).toBeDefined();

    expect(asFragment()).toMatchSnapshot();
  });
});
