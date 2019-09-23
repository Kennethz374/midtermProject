const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    console.log('route');
    res.redirect('/polls/:id');
  })


  router.get("/", (req, res) => {
    res.render("polls")
  })


  // For voting

  return router;

}
