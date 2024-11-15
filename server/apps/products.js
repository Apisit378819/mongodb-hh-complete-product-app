import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();
const collection = db.collection("products");

productRouter.get("/", async (req, res) => {
  const result = await collection.find().toArray();
  return res.status(200).json({ data: result });
});

productRouter.get("/:id", async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const result = await collection.find({ _id: productId }).toArray();
  return res.status(200).json({ data: result });
});

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
      message: `Product has been created successfully : ${result.acknowledged} : ${result.insertedId} `,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

productRouter.put("/:id", async (req, res) => {
  const updatedProduct = { ...req.body };
  const productId = new ObjectId(req.params.id);
  const result = await collection.updateOne(
    { _id: productId },
    {
      $set: {
        name: updatedProduct.name,
        price: updatedProduct.price,
        image: updatedProduct.image,
        description: updatedProduct.description,
        category: updatedProduct.category,
      },
    }
  );
  return res.status(201).json({ message: "Success" });
});

productRouter.delete("/:id", async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const result = await collection.deleteOne({ _id: productId });
  return res.status(201).json({
    message: "Product has been deleted successfully",
    acknowledged: result.acknowledged,
  });
});

export default productRouter;
