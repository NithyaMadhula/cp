export const replacePipe = (value) => {
  return value ? value.replace("|", ", ") : "";
};

export const defaultify = (value, def) => (value ? value : def || "--");

export const formatDate = (date) => {
  let removeAfter = date.indexOf("T");
  date = date.substring(0, removeAfter !== -1 ? removeAfter : date.length);

  return date;
};

export const ticketPrice = (val) => {
  return `$${parseInt(val).toFixed(0)}`;
};
