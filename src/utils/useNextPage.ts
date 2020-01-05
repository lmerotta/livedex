import { useState, useCallback } from "react";
import { useFetcher } from "rest-hooks";

const useNextPage = (shape: any, offsetIncrement: number = 60) => {
  const [offset, setOffset] = useState(60);
  const [isFetching, setFetching] = useState(false);
  const getNextPage = useFetcher(shape);

  const mergeResults = useCallback(
    (newData: { results: any[] }, data: { results?: any[] }) => ({
      results: [...(data.results || []), ...newData.results]
    }),
    []
  );

  const fetcher = useCallback(() => {
    setFetching(true);
    return getNextPage({ offset: offset, limit: offsetIncrement }, {}, [
      [shape, {}, mergeResults]
    ]).then(
      () => {
        setFetching(false);
        setOffset(s => s + offsetIncrement);
      },
      () => setFetching(false)
    );
  }, [getNextPage, mergeResults, offset, offsetIncrement, shape]);

  return { fetcher, isFetching };
};

export default useNextPage;
