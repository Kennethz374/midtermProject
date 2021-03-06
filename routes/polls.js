const express = require('express');
const router  = express.Router();
const yelp = require("yelp-fusion");
const cookieParser = require('cookie-parser')
router.use(cookieParser())
module.exports = (dataHelpers) => {

  // For voting
router.post("/", (req, res) => {
  const client = yelp.client(process.env.YELP_API);

  client.search(
    {
      term: req.body.input,
      location: 'vancouver'
    })
    .then(response => {
      const Result = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(Result, null, 4);
      res.send(Result);
  });
})

router.get("/:poll_string", (req, res) => {
  if (req.cookies.Created) {
    res.redirect("/results/"+ req.params.poll_string);
  }
  // else {
  //   dataHelpers.getPollResponses(req.params.poll_string)
  //   .then((data)=> {
  //     return res.render('polls', data);
  //   })
  // }



  dataHelpers.getActivePoll(req.params.poll_string)
    .then ((data) => {
      if (data.length > 0) {
        return res.render("polls",data[0]);
      }
      else {
        return res.redirect('/results');
      }
    })
});


return router;
}



