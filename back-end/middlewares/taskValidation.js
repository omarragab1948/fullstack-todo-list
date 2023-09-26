const { body, validationResult } = require("express-validator");

const validateTask = [
  body("title").notEmpty().withMessage("Title is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("status").notEmpty().withMessage("Status is required"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  validateTask,
  handleValidationErrors,
};
