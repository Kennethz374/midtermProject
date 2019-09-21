
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  res.send("THIS IS THE HOME PAGE WE MADE IT");
})

//For creating a new poll
router.post("/", (req, res) => {
  console.log('route');
  res.redirect('/home');
})
return router;

}
