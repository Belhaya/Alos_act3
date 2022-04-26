const express = require("express");
const router = express.Router();
// controller path
const controller = require("../controller/controller");
const { body, validationResult } = require('express-validator');


// signup routes
router.post("/signup",
//body('name').isLength({ min: 6 }),
// username must be an email
//body('email').isEmail(),
// password must be at least 5 chars long
//body('password').isLength({ min: 6 }),
//(req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  //const errors = validationResult(req);
  //if (!errors.isEmpty()) {
  //  return res.status(400).json({ errors: errors.array() });
  //}
 // else{


controller.signup
//}}
)

// login routes
router.post("/login", controller.login);

//course routes
//router.get("/tutorial", requiredtoken, controller.tutorial);

// requiredtoken
function requiredtoken(req, res, next) {
  let headers = req.headers["token"];
  console.log(headers, "token##");
  if (typeof headers !== undefined && headers !== "") {
    req.token = headers;
    next();
    
  } else {
   return res.send({
      status: false,
      msg: "token required ...",
    });
  }
}
router.get("/home",requiredtoken, controller.home);

module.exports = router;
