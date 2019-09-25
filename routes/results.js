const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {
//For randomizing after the voting is completed
router.post("/", (req, res) => {
  res.redirect('/results');
})

router.get("/:poll_string", (req, res) => {
  dataHelpers.getRankings(req.params.poll_string)
  .then((data) => {
    console.log('DATA', data);
    dataHelpers.getTotalRanking(req.params.poll_string)
    .then ((data1) => {
      var t = {rankings:data,totalrankings: data1};
      res.render("results");
    })

  })
});

//For deleting previous polls
router.delete("/", (res, req) => {
  console.log("DELETE");
  res.redirect("/polls/:id")
});

router.post("/:poll_string", (req, res) => {

  res.redirect("/results/" + req.params.poll_string);
});

return router;

}



