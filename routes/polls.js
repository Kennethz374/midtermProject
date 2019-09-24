const express = require('express');
const router  = express.Router();
const yelp = require("yelp-fusion");
module.exports = (dataHelpers) => {

router.get("/:poll_string", (req, res) => {
  dataHelpers.getPoll(req.params.poll_string)
  .then (dataHelpers.getOptions)
  .then ((result) => {
    const templateVars = result;
    console.log(templateVars, "tEMPLATEVARS")
    res.render("polls", templateVars)
  })

})
    // const templateVars = data;
    // console.log(templateVars, "HELLO");
    // res.render("polls", templateVars)



// For voting
router.post("/", (req, res) => {
  console.log(req.body);
  const client = yelp.client(process.env.YELP_API);

  client.search(
    {
      term: req.body.input,
      location: 'vancouver'
    })
    .then(response => {
      const Result = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(Result, null, 4);
      console.log(`total restaurants ${Result.length}`);
      res.send(Result);
  });
})
return router;
}

