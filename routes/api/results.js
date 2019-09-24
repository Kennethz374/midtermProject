const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {

  router.get("/", (req, res) => {
    dataHelpers.resultSQL()
    .then(test => res.json({test}));
  });

  return router;

}
