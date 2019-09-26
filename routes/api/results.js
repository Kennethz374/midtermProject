const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {

  router.get("/:poll_string", (req, res) => {
    const results = {};
    const rankPoints = {
      1: 3,
      2: 2,
      3: 1
    }

    dataHelpers.getResults(req.params.poll_string)
    .then((result) => {
      for(let res of result) {
        let id = res.option_id;
        if(results[id]) {
          results[id].points += rankPoints[res.ranking] || 0;
        } else {
          results[id] = {
            name: res.name,
            ranking: res.ranking,
            food: res.food,
            description: res.description,
            points: rankPoints[res.ranking]
          }
        }
      }

      let sum = 0;
      for (let i in results) {
        if(results[i].points) {
          sum += results[i].points;
        }
      }

      const percentage = function (results) {
        for(let i in results) {
          if(results[i].points) {
            return (Math.round((results[i].points/sum) * 100) + '%');
          }
        }
      }

      console.log(percentage());


      res.render("results", {results: Object.values(results)});
    })
  });


  return router;

}

