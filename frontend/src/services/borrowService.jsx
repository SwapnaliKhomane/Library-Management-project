
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};


export const borrowBook = async (bookId, borrowerName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/borrow`, {
      bookId,
      borrowerName,
    });
    return response.data; 
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw error;
  }
};


export const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};
