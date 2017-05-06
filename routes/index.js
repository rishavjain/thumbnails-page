var express = require('express');
var fs = require('fs');
var ini = require('ini');
var router = express.Router();

var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {config: config});
});

module.exports = router;
