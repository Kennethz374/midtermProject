const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser())

module.exports = (dataHelpers) => {

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
    console.log("This is the data ID  ", data.id);
    res.cookie("sessionUserID", data.id)
    res.redirect("/results/"+req.params.poll_string);


  })
});

return router;

}

