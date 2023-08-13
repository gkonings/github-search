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
    errorMessage: null,
  });
  const { isLoading, results, errorMessage } = state;
  const hasSearch = !!query?.search;

  useEffect(() => {
    const getResults = async () => {
      setState({ isLoading: true });
      try {
        const searchResult = await searchRepositories(query);
        setState({
          isLoading: false,
          results: searchResult,
          errorMessage: null,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Github error :", error?.message);
        const message =
          "Something went wrong trying to fetch results. Check the console logs for more information";

        setState({ isLoading: false, errorMessage: message, results: [] });
      }
    };

    if (hasSearch) {
      getResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!hasSearch) {
    return (
      <ContentContainer testId="welcome-screen">
        Try typing a keyword, and see if github has something for you.
      </ContentContainer>
    );
  }

  if (isLoading) {
    return (
      <ResultsContainer testId="result-is-loading">
        <Skeleton variant="rounded" height={90} sx={{ px: 2, pb: 2 }} />
      </ResultsContainer>
    );
  }

  if (errorMessage) {
    return <ContentContainer testId="error">{errorMessage}</ContentContainer>;
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
    <ContentContainer testId="no-result">
      There seems to be no results for <strong>{query.search}</strong>. Are you
      sure you spelled it correct?
    </ContentContainer>
  );
}
