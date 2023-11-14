export default (str: string) => {
  if (!str) {
    return null;
  }
  return new Date(str);
};
