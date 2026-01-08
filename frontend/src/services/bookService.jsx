export const getBooks = async () => {
  const res = await fetch("http://localhost:5000/api/books");
  return res.json();
};
