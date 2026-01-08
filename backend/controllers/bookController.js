import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getBooks = async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const addBook = async (req, res) => {
  const { title, author, published } = req.body;

  const newBook = await prisma.book.create({
    data: {
      title,
      author,
      published: Number(published),
    },
  });

  res.status(201).json(newBook);
};
