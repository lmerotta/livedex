import { useState, useCallback } from "react";
import { useFetcher } from "rest-hooks";

const useNextPage = (shape: any) => {
  const [offset, setOffset] = useState(60);
  const [isFetching, setFetching] = useState(false);
  const getNextPage = useFetcher(shape);

  // istanbul ignore next
  const mergeResults = useCallback(
    (newData: { results: any[] }, data: { results?: any[] }) => ({
      results: [...(data.results || []), ...newData.results]
    }),
    []
  );

  const fetcher = useCallback(() => {
    setFetching(true);
    return getNextPage({ offset: offset, limit: 60 }, {}, [
      [shape, {}, mergeResults]
    ]).then(
      // istanbul ignore next
      () => {
        setFetching(false);
        setOffset(s => s + 60);
      },
      // istanbul ignore next
      () => setFetching(false)
    );
  }, [getNextPage, mergeResults, offset, shape]);

  return { fetcher, isFetching };
};

export default useNextPage;
