import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // react-router-dom install करा
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books"); // backend API
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <h2>Loading books...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Library</h1>
      <h3>Total Books: {books.length}</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              width: "200px",
            }}
          >
            <h4>{book.title}</h4>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <Link to={`/borrow/${book.id}`}>
              <button>Borrow Book</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
