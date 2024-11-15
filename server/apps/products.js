import { Router } from "express";
import { db } from "../utils/db";

const productRouter = Router();
const collection = db.collection("products");

productRouter.get("/", (req, res) => {});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  const newPost = { ...req.body };
  try {
    const result = await collection.insertOne({
      name: newPost.name,
      price: newPost.price,
      image: newPost.image,
      description: newPost.description,
      category: newPost.category,
    });
    return res.status(201).json({
      message: `Product has been created successfully : ${result} `,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

productRouter.put("/:id", (req, res) => {});

productRouter.delete("/:id", (req, res) => {});

export default productRouter;
