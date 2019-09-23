
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  res.render("login.ejs")
})

//Fro loggining to the page
router.post("/", (req, res) => {
  res.redirect('/login');
})
return router;

}
