import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await prisma.user.create({
      data: { name, email, password, role },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
