import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const allProduct = await collection.find({}).toArray();
    return res.json({ data: allProduct });
  } catch (error) {
    console.error(error);
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);

    const productById = await collection.findOne({ _id: productId });
    return res.json({ data: productById });
  } catch {}
});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productData = { ...req.body };
    await collection.insertOne(productData);
    return res.status(201).json({
      message: `Product Id ${productData.insertedId} has been created successfully`,
    });
  } catch (error) {
    return res.json({
      message: `There is an error on the server side`,
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    const updateProductData = { ...req.body };
    await collection.updateOne(
      { _id: productId },
      { $set: { updateProductData } }
    );
    return res.json({
      message: `Product ${productId} has been updated successfully`,
    });
  } catch (error) {
    console.error(error);
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    await collection.deleteOne({
      _id: productId,
    });
    return res.json({
      message: `Product has been deleted successfully`,
    });
  } catch (error) {
    console.error(error);
  }
});

export default productRouter;
