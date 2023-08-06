export const SearchResults = ({ results }) => {
  if (!results.length) {
    return <div>no results</div>;
  }

  return (
    <ul>
      {results.map((result) => {
        // console.log({ result });

        return (
          <li key={result.id}>
            {result.fullName} ({result.starCount})
          </li>
        );
      })}
    </ul>
  );
};
