const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  res.send("THIS IS THE result PAGE WE MADE IT")
})

//For randomizing after the voting is completed
router.post("/", (req, res) => {
  console.log('route');
  res.redirect('/results');
})

//For deleting previous polls
router.delete("/", (res, req) => {
  console.log("DELETE");
  res.redirect("/polls/:id")
})
return router;

}
