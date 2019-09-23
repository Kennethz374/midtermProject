const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  res.render("polls.ejs")
})


// For voting
router.post("/", (req, res) => {
  res.redirect('/polls/:id');
})
return router;

}
