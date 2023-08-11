import { useEffect, useState } from "react";
import NextLink from "next/link";

import ContentContainer from "@/components/containers/ContentContainer";
import ResultsContainer from "@/components/containers/ResultsContainer";
import { getHistory } from "@/lib/history";
import Item from "./Item";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  if (history.length > 0) {
    return (
      <ResultsContainer>
        {history.map((paramsString, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Item key={i} paramsString={paramsString} />
        ))}
      </ResultsContainer>
    );
  }

  return (
    <ContentContainer>
      It seems you don&apos;t have a history yet. Try{" "}
      <NextLink href="/">searching</NextLink> something first.
    </ContentContainer>
  );
}
