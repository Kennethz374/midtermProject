const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

module.exports = (dataHelpers) => {

    //For creating a new poll
  router.post("/", (req, res) => {
    const newPollid = dataHelpers.randomStringGenerator();
    const futureValues = [req.body.formEnd]
    const futureTime = dataHelpers.futureTime(futureValues)
    .then((data) => {
      const values = [newPollid, req.body.title, req.body.description, data['?column?']]
      const pollCreation = dataHelpers.createPoll(values)
      .then((data2) => {
        res.redirect("/polls/" + newPollid);
      })

    })

  })

  router.get("/", (req, res) => {
    console.log(dataHelpers.randomStringGenerator());

    res.render("index.ejs");
  })


  return router;

}
