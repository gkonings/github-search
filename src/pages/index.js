import Head from "next/head";

import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}

export default function Home({ query }) {
  return (
    <>
      <Head>
        <title>Search Github</title>
      </Head>
      <main>
        <SearchForm query={query} />
        <SearchResults query={query} />
      </main>
    </>
  );
}
