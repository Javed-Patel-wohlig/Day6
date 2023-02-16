// const test = [
//   {
//     _id: "123asdf",
//     name: "chicken",
//     price: 100,
//   },
//   {
//     _id: "456asdf",
//     name: "beef",
//     price: 200,
//   },
//   {
//     _id: "789asdf",
//     name: "mutton",
//     price: 400,
//   },
// ];

// let product = test.find((item) => item._id === "123asdf");
// console.log(product)

const Ajv = require("ajv");

const schema = {
  "type": "array",
  "minItems": 3,
  "maxItems": 3,
  "items": [
    { "type": "string" },
    { "type": "string", "pattern": "^\\d{10}$" },
    { "type": "number", "minimum": 0 }
  ]
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

const data = ["javed", '9137761883', 22];
const isValid = validate(data);

if (isValid) {
  console.log("Data is valid.");
} else {
  console.log("Data is invalid.");
  // validate.errors.forEach(err => {
  //   console.log(err.message);
  // });
  console.log(validate.errors[0].message);
}
