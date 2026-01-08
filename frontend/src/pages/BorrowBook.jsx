import React, { useState, useEffect } from "react";
import axios from "axios";

function BorrowBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  const [message, setMessage] = useState("");

  // Backend वरून books fetch करणे
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  // Borrow book submit function
  const handleBorrow = async (e) => {
    e.preventDefault();
    if (!selectedBook || !borrowerName) {
      setMessage("Please select a book and enter your name.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/borrow", {
        bookId: selectedBook,
        borrowerName,
      });
      setMessage(response.data.message);
      setBorrowerName("");
      setSelectedBook("");
    } catch (err) {
      console.error(err);
      setMessage("Error borrowing book.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Borrow a Book</h1>

      <form onSubmit={handleBorrow}>
        <div>
          <label>Choose a Book: </label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">--Select Book--</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Your Name: </label>
          <input
            type="text"
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Borrow Book
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default BorrowBook;
