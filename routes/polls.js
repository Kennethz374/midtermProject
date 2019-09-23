const express = require('express');
const router  = express.Router();
const yelp = require("yelp-fusion");
module.exports = (db) => {
router.get("/", (req, res) => {
  res.render("CreatePoll")
})


// For voting
router.post("/", (req, res) => {
  console.log(req.body.inputContent);
  const client = yelp.client(process.env.YELP_API);

  client.search({term: req.body.inputContent, location: "vancouver"}).then(response => {
    const Result = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(Result, null, 4);
    console.log(`total restaurants ${Result.length}`);
    res.send(prettyJson);
  }).catch(e => {
    console.log(e);
  });
})
return router;

}



