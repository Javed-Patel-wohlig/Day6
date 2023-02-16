const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const schema = new mongoose.Schema({
  name: {
    type: String,
    min: 10,
    max: 50,
    required: true,
  },
  description: {
    type: String,
    min: 50,
    max: 500,
    required: false,
  },
  price: {
    type: Number,
    min: 100,
    required: true,
  },

  detail: {
    type: [String, String, Number],
    validate: {
      validator: function (v) {
        return v.length === 3;
      },
      message: (props) => `${props.path} must have exactly 3 elements`,
    },
  },
});

const Product = mongoose.model("Product", schema);


const result = Product.aggregate([
  { $group: { _id: "$category", avgPrice: { $avg: "$price" } } }
])


console.log(result)

// Product.insertMany({"details":["javed", 1234567890, 20]})
// Product.create({details:["javed", 1234567890, 20]},(err,result)=>{
//     console.log(result)
// })

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(404).send({ message: "No products found" });

    res.send(products);
    console.log(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    let name = req.body.name;
    // console.log(name);
    const existingProduct = await Product.findOne({ name: name });
    // console.log(existingProduct);
    if (existingProduct)
      return res.status(409).json({ message: "Product already exists" });

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      detail: req.body.detail,
    });
    // const valid = validate(product);
    // if(!valid) return res.status('400').json({ message: 'product not validated' });
    
    product = await product.save();
    console.log(product);
    res.send(product);
    // console.log(product);
  } catch (err) {
    console.log(Error);
    res.status(500).send(err._message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let productId = req.params.id.trim();
    let product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).send("Product not found");

    product = await Product.updateOne(
      { _id: productId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
        },
      },
      { new: true }
    );

    console.log(product);
    res.send(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let productId = req.params.id.trim();
    let product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).send("Product not found");
    await product.delete();
    res.send(product);
  } catch (err) {
    console.log("something", err._message);
    res.status(500).send("Server error", err._message);
  }
});

module.exports = router;
