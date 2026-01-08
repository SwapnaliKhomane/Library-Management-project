// src/services/borrowService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // backend URL

// सर्व books fetch करणे
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// book borrow करणे
export const borrowBook = async (bookId, borrowerName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/borrow`, {
      bookId,
      borrowerName,
    });
    return response.data; // { message: "Book borrowed successfully" }
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw error;
  }
};

// single book fetch करणे (optional)
export const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};
