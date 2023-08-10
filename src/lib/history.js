export const getHistory = () => {
  const history = JSON.parse(sessionStorage.getItem("history"));
  return history || [];
};

export const addToHistory = (item) => {
  const newHistory = JSON.stringify([item, ...getHistory()]);
  sessionStorage.setItem("history", newHistory);
};
