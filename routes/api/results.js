const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {
  console.log("hello")

  // router.get("/:poll_string", (req, res) => {
  //   console.log('PARAMS',req.params)
  //   dataHelpers.getRankings(req.params.poll_string)
  //   .then((data) => {
  //     console.log('DATA', data);
  //     dataHelpers.getTotalRanking(req.params.poll_string)
  //     .then ((data1) => {
  //       var t = {rankings:data,totalrankings: data1};
  //       console.log("ROHIT ",t);
  //       res.render("results", t);
  //      })

  //   })
  // });

  return router;

}


