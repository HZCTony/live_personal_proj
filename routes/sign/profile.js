var express = require('express');
var router = express.Router();

const title = 'WatchBuy';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('profile', { title: title });
});



module.exports = router;
