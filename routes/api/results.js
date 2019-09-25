const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {

  router.get("/:poll_string", (req, res) => {
    console.log("================================")
    dataHelpers.getRankings(req.params.poll_string)
    .then((votes) => {
      console.log("VOTES", votes)
      dataHelpers.getTotalRanking(req.params.poll_string)
      .then ((points) => {
        console.log('POINTS', points)
        const food = [];
        const rankingId = [];
        const totalPoints = [];
        for (let i in votes) {
          if (votes[i].hasOwnProperty('user') && votes[i].hasOwnProperty('ranking_id')) {
          food.push(votes[i].food);
          rankingId.push(votes[i].ranking_id);
          }
        };
        for (let j in points) {
          if (points[j].hasOwnProperty('ranking_id')) {
            totalPoints.push(points[j].case)
          }
        }
        res.render("results", {food: food, totalPoints: totalPoints});
      })
    })
  });

  return router;

}


