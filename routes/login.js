
const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')

router.use(cookieParser())

module.exports = (dataHelpers) => {

router.get("/", (req, res) => {
  const hello = 1
  res.cookie(hello, 1)
  console.log('cookies: ', req.cookies)

  res.render("login.ejs")
})

//Fro loggining to the page
router.post("/", (req, res) => {
  console.log(req.body.login)
  dataHelpers.passwordCheck(req.body.login)
  .then ((result) => {
    console.log(result, "HEADFS", req.body.password);
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
