import React, { useEffect, useState } from "react";
import BookCard from "./components/BookCard.jsx";

function App() {
  // Dummy data fallback
  const dummyBooks = [
    { id: 1, title: "Book 1", author: "Author 1", published: 2023 },
    { id: 2, title: "Book 2", author: "Author 2", published: 2022 },
  ];

  const [books, setBooks] = useState(dummyBooks);

  // form states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");

  // Backend URL
  const API_URL = "http://localhost:5000/api/books";

  // GET books
  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch from backend");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.warn("Backend not available, using dummy data");
      setBooks(dummyBooks);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // POST book
  const addBook = async () => {
    if (!title || !author || !published) {
      alert("All fields required");
      return;
    }

    // Try backend POST
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, published }),
      });

      if (!res.ok) throw new Error("Backend POST failed");

      const newBook = await res.json();
      setBooks([...books, newBook]);
    } catch (err) {
      console.warn("Backend POST failed, adding to frontend only");
      // fallback: add to frontend state
      setBooks([...books, { id: books.length + 1, title, author, published }]);
    }

    // clear form
    setTitle("");
    setAuthor("");
    setPublished("");
  };

  return (
    <div>
      <h1>Library Books</h1>

      {/* ADD BOOK FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          placeholder="Published Year"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <hr />

      {/* BOOK LIST */}
      <div>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default App;
