const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.use(bodyParser.urlencoded({extended: true}));

module.exports = (dataHelpers) => {

    //For creating a new poll
  router.post("/", (req, res) => {
    const newPollid = dataHelpers.randomStringGenerator();
    const cookieID = req.cookies.sessionUserID
    const futureValues = [req.body.formEnd]

    if (cookieID) {
      dataHelpers.futureTime(futureValues)
      .then((data) => {
        const values = [newPollid, cookieID, req.body.title, req.body.description, data['?column?']]
        const pollCreation = dataHelpers.createPoll(values)
        .then((data2) => {
          res.redirect("/polls/" + newPollid);
        })
       })
      }
      else {
        res.redirect("/login")
      }

  })

  router.get("/", (req, res) => {
    res.render("index.ejs");
  })

  router.post("/:poll_string", (req, res) => {
    console.log("test");
    //res.render("home")
  });



  return router;

}
