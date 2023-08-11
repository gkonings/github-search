/* eslint-disable import/prefer-default-export */
export const setStateReducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

export const getTagValue = ({ key, params }) => {
  const value = params[key];

  if (!value) return null;

  if (key === "stars" || key === "followers") {
    if (value.charAt(0) === "<") {
      return `less than ${value.slice(1)}`;
    }

    if (value.charAt(0) === ">") {
      return `more than ${value.slice(1)}`;
    }
  }

  if (key === "sort") {
    if (params.order === "desc") {
      return `most ${value}`;
    }
    if (params.order === "asc") {
      return `fewest ${value}`;
    }
  }

  return value;
};
