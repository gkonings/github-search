/* eslint-disable import/prefer-default-export */
export const setStateReducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});
