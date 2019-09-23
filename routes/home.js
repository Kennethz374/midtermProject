
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  res.render("index.ejs");
})

//For creating a new poll
router.post("/", (req, res) => {
  console.log('route');
  res.redirect('/home');
})
return router;

}
