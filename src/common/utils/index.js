export const getDate = (date = new Date()) => {
  const d = new Date(date);
  const getMonth = (d.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const getDate = d
    .getDate()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const getFullYear = d.getFullYear();

  return `${getFullYear}-${getMonth}-${getDate}`;
};
