const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser())

module.exports = (dataHelpers) => {


  router.get("/:poll_string", (req, res) => {
    console.log('!!!!HERE!!!!!!!')
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

//For randomizing after the voting is completed
router.post("/", (req, res) => {
  console.log(req.body)
  console.log('route');
  res.redirect('/results');
})

//For deleting previous polls
router.delete("/", (res, req) => {
  res.redirect("/polls/:id")
});

// router.post("/:poll_string", (req, res) => {
//   console.log("HELLOOWORLD")
//   dataHelpers.createUser("Kenneth0000")
//   .then((data)=>{
//     console.log(req.body, "RESULTS HERE FOR ME123")
//     res.cookie("sessionUserID", data.id)
//     res.redirect("/results/"+req.params.poll_string);


//   })
// })

router.post("/:poll_string/insert", (req, res) => {
  console.log(req.body, "RESULTS HERE FOR ME123")
  dataHelpers.createUser("Kenneth0000")
  .then((data)=>{
    res.cookie("sessionUserID", data.id)
    res.redirect("/results/"+req.params.poll_string);
  })
});

return router;

}


