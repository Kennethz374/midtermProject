const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  res.send("THIS IS THE POLLS PAGE WE MADE IT")
})


// For voting
router.post("/", (req, res) => {
  console.log('route');
  res.redirect('/polls/:id');
})
return router;

}
