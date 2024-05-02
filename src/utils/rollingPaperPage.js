export function formatDateWithDot(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const formattedString = `${year}.${month}.${day}`;

  return formattedString;
}
