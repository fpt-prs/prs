export default (date: Date) => {
  if (!date) {
    return null;
  }

  // format date to dd/mm/yyyy
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};
