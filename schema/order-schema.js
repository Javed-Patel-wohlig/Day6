const ajv = require("./ajv-schema");
const ajvKeywords = require('ajv-keywords');

ajvKeywords(ajv);

const jsonSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    price: { type: "number", minimum: 100 },
    detail: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: [
        { type: "string" },
        { type: "string", pattern: "^\\d{10}$" },
        { type: "number", minimum: 0 },
      ],
      additionalProperties: false,
      uniqueItems: true,
      // validate: {
      //   unique: (items, { instance }) => {
      //     const Product = require("./models/Product");

      //     return Promise.all(
      //       items.map(async (item) => {
      //         const found = await Product.exists({
      //           "items.0": item[0],
      //           "items.1": item[1],
      //           "items.2": item[2],
      //           _id: { $ne: instance && instance._id },
      //         });

      //         if (found) {
      //           return false;
      //         }

      //         return true;
      //       })
      //     );
      //   },
      // },
    },
  },
  required: ["name", "price", "detail"],
  additionalProperties: true, 
};
module.exports = ajv.compile(jsonSchema);
