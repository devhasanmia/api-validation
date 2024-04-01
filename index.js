const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();

app.use(express.json());

const reqValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters long"),
  body("email")
  .isEmail()
  .withMessage("Email must be a valid email")
];

app.post("/", reqValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ message: "Hello World!" });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
