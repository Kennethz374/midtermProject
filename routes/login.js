
const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {

router.get("/", (req, res) => {
  res.render("login.ejs")
})

//Fro loggining to the page
router.post("/", (req, res) => {
  console.log(req.body.login)
  dataHelpers.passwordCheck(req.body.login)
  .then ((result) => {
    console.log(result.password, "HEADFS", req.body.password);
    if (result.password === req.body.password) {
      console.log("print")
      res.redirect('/home')
    }
    else {
      console.log("HELP ME")
      res.redirect('/login')
    }
  })
})
return router;

}
