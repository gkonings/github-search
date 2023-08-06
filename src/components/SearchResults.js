import { useState, useEffect } from "react";
import { searchRepositories } from "@/lib/github";

import { useSearchParams } from "next/navigation";

export const SearchResults = ({ results }) => {
  if (!results.length) {
    return <div>no results</div>;
  }

  return (
    <ul>
      {results.map((result) => {
        return <li key={result.id}>{result.name}</li>;
      })}
    </ul>
  );
};
