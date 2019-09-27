const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser())

module.exports = (dataHelpers) => {
//  console.log( "we are hiting this NOT API route")
router.get("/:poll_string", (req, res) => {
  res.render('results');
});

//For randomizing after the voting is completed
router.post("/", (req, res) => {
  res.redirect('/results');
})

//For deleting previous polls
router.delete("/", (res, req) => {
  res.redirect("/polls/:id")
});

router.post("/:poll_string", (req, res) => {
  dataHelpers.createUser("Kenneth0000")
  .then((data)=>{
    res.cookie("Created", data.id)
    res.redirect("/results/"+req.params.poll_string);


  })
});

return router;

}

