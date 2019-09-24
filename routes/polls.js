const express = require('express');
const router  = express.Router();
const yelp = require("yelp-fusion");
module.exports = (db) => {


router.get("/", (req, res) => {
  res.render("polls.ejs")

})



// For voting
router.post("/", (req, res) => {
  console.log(req.body);
  const client = yelp.client(process.env.YELP_API);

  client.search(
    {term: req.body.input,
     location: "vancouver"
    }).then(response => {
    const Result = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(Result, null, 4);
    console.log(`total restaurants ${Result.length}`);
    res.send(Result);
  }).catch(e => {
    console.log(e);
  });
})
return router;



}



