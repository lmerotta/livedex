import React from "react";
import nock from "nock";
import { makeCacheProvider, makeRenderRestHook } from "@rest-hooks/test";
import useNextPage from "../useNextPage";
import SpeciesListResource from "../../pokedex/resources/SpeciesList";
import { act } from "react-test-renderer";

describe("useNextPage hook unit tests", () => {
  let renderTestHook;

  beforeEach(() => {
    nock("https://pokeapi.co")
      .persist()
      .defaultReplyHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      })
      .options(/.*/)
      .reply(200)
      .get("/api/v2/pokemon-species?offset=60&limit=60")
      .reply(200, {});

    renderTestHook = makeRenderRestHook(makeCacheProvider);
  });

  afterEach(() => {
    nock.cleanAll();
    renderTestHook.cleanup();
  });

  it("Should launch the correct request", async () => {
    const { result, waitForNextUpdate } = renderTestHook(() => {
      const { fetcher } = useNextPage(SpeciesListResource.listShape());
      return <div onClick={fetcher}>Test</div>;
    });

    act(() => {
      result.current.props.onClick();
    });
    expect(result.error).not.toBeDefined();
  });
});
