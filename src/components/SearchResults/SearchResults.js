import { useEffect, useReducer } from "react";
import Skeleton from "@mui/material/Skeleton";

import ContentContainer from "@/components/containers/ContentContainer";
import ResultsContainer from "@/components/containers/ResultsContainer";
import { searchRepositories } from "@/lib/github";
import { setStateReducer } from "@/lib/utils";

import Result from "./Result";

export default function SearchResults({ query }) {
  const [state, setState] = useReducer(setStateReducer, {
    isLoading: false,
    results: [],
  });
  const { isLoading, results } = state;
  const hasSearch = !!query.search;

  useEffect(() => {
    const getResults = async () => {
      setState({ isLoading: true });
      const searchResult = await searchRepositories(query);
      setState({ isLoading: false, results: searchResult });
    };

    if (hasSearch) {
      getResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!hasSearch) {
    return (
      <ContentContainer>
        Try typing a keyword, and see if github has something for you.
      </ContentContainer>
    );
  }

  if (isLoading) {
    return (
      <ResultsContainer>
        <Skeleton variant="rounded" height={90} sx={{ px: 2, pb: 2 }} />
      </ResultsContainer>
    );
  }

  if (results.length > 0) {
    return (
      <ResultsContainer>
        {results.map((result) => (
          <Result key={result.id} result={result} />
        ))}
      </ResultsContainer>
    );
  }

  return (
    <ContentContainer>
      There seems to be no results for <strong>{query.search}</strong>. Are you
      sure you spelled it correct?
    </ContentContainer>
  );
}
