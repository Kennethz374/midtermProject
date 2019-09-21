
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  res.send("THIS IS THE login PAGE WE MADE IT")
})

//Fro loggining to the page
router.post("/", (req, res) => {
  console.log('route');
  res.redirect('/login');
})
return router;

}
