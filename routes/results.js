const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {
//For randomizing after the voting is completed
router.post("/", (req, res) => {
  console.log('route');
  res.redirect('/results');
})

router.get("/:poll_string", (req, res) => {
  console.log('PARAMS',req.params)
  dataHelpers.getRankings(req.params.poll_string)
  .then((data) => {
    console.log('DATA', data);
    dataHelpers.getTotalRanking(req.params.poll_string)
    .then ((data1) => {
      var t = {rankings:data,totalrankings: data1};
      console.log("ROHIT ",t);
      res.render("results");
    })

  })
});

//For deleting previous polls
router.delete("/", (res, req) => {
  console.log("DELETE");
  res.redirect("/polls/:id")
})
return router;

}



