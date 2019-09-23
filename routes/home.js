
const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {

    //For creating a new poll
  router.post("/", (req, res) => {
    const newPollid = dataHelpers.randomStringGenerator();
    console.log(newPollid);
    dataHelpers.firstSQL()
    .then((test) => {
      res.send(test)
    })
  // NEED TO SEND A SQL REQUEST IN DB TO CREATE AND RENDER THE TWEET
  //
    res.redirect("/" + newPollid);
  })

  router.get("/", (req, res) => {
    console.log(dataHelpers.randomStringGenerator());

    res.render("index.ejs");
  })


  return router;

}
