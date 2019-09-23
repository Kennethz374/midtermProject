const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

module.exports = (dataHelpers) => {

    //For creating a new poll
  router.post("/", (req, res) => {
    const newPollid = dataHelpers.randomStringGenerator();
    const pollCreation = dataHelpers.createPoll(req.body);
    console.log(pollCreation)
    res.redirect("/" + newPollid);
    // dataHelpers.firstSQL()
    // .then((test) => {
    //   res.send(test)
    // })
  // NEED TO SEND A SQL REQUEST IN DB TO CREATE AND RENDER THE TWEET
  //

  })

  router.get("/", (req, res) => {
    console.log(dataHelpers.randomStringGenerator());

    res.render("index.ejs");
  })


  return router;

}
