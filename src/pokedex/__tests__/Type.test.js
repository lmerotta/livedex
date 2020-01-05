import React from "react";
import { render } from "@testing-library/react";
import { MockProvider } from "@rest-hooks/test";
import TypeResource from "../resources/Type";
import Type from "../Type";

const types = [
  {
    request: TypeResource.detailShape(),
    params: { name: "rock" },
    result: {
      name: "rock",
      names: [{ language: { name: "fr" }, name: "Roche" }]
    }
  }
];

describe("Type unit tests", () => {
  it("Renders correctly", () => {
    const tree = (
      <MockProvider results={types}>
        <Type name="rock" />
      </MockProvider>
    );
    const { queryByText, asFragment } = render(tree);
    const content = queryByText("Roche");
    expect(content).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
