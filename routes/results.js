const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {
router.get("/:poll_string", (req, res) => {
  res.render('results');
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
});

router.post("/:poll_string", (req, res) => {
  console.log("DSFASDFADFSA")
  res.redirect("/results/" + req.params.poll_string);
});

return router;

}

