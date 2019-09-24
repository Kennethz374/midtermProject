const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {
router.get("/", (req, res) => {

  dataHelpers.resultSQL()
  .then(test => res.json({test}));
});

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

