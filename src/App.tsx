import React, { Suspense } from "react";
import { NetworkErrorBoundary, useResource } from "rest-hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import useNextPage from "./utils/useNextPage";
import { CardContainer } from "./ui";
import SpeciesListResource from "./pokedex/resources/SpeciesList";
import SpeciesPlaceholder from "./pokedex/placeholders/SpeciesPlaceholder";

const SpeciesLazy = React.lazy(() => import("./pokedex/Species"));

const App: React.FC = () => {
  const list = useResource(SpeciesListResource.listShape(), {});
  const { fetcher } = useNextPage(SpeciesListResource.listShape());

  return (
    <NetworkErrorBoundary>
      <InfiniteScroll
        dataLength={list.results.length}
        next={fetcher}
        hasMore={list.next !== null}
        scrollThreshold="150px"
        loader={<SpeciesPlaceholder />}
      >
        <CardContainer>
          {list.results.map(r => (
            <Suspense key={r.name} fallback={<SpeciesPlaceholder />}>
              <SpeciesLazy name={r.name} />
            </Suspense>
          ))}
        </CardContainer>
      </InfiniteScroll>
    </NetworkErrorBoundary>
  );
};

export default App;
