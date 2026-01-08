import React from "react";

function BookCard({ book }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Published: {book.published || book.genre || "N/A"}</p>
    </div>
  );
}

export default BookCard;
