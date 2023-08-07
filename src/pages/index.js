import Head from "next/head";

import { SearchForm } from "@/components/SearchForm";
import { SearchResults } from "@/components/SearchResults";
import { searchRepositories } from "@/lib/github";

export async function getServerSideProps({ query }) {
  console.log({ query });
  const hasSearch = !!query.search;
  const results = hasSearch ? await searchRepositories(query) : [];

  return {
    props: {
      hasSearch,
      query,
      results,
    },
  };
}

export default function Home({ hasSearch, query, results }) {
  return (
    <>
      <Head>
        <title>Search Github</title>
      </Head>
      <main>
        <SearchForm query={query} />

        {hasSearch && <SearchResults results={results} />}
      </main>
    </>
  );
}
