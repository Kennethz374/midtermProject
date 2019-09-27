
const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')

router.use(cookieParser())

module.exports = (dataHelpers) => {
router.get("/", (req, res) => {

  res.render("login.ejs")
})

router.get("/logout", (req, res) => {
  res.clearCookie("sessionUserID")
  res.clearCookie("Created")
  res.redirect("/login")

})

//Fro loggining to the page
router.post("/", (req, res) => {
  dataHelpers.passwordCheck(req.body.login)
  .then ((result) => {
    if (result.password === req.body.password) {
      res.cookie("sessionUserID", result.id)
      res.redirect('/home')
    }
    else {
      res.redirect('/login')
    }
  })
})
return router;

}
