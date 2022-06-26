const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', {title: 'Bloom API Infrastructure'});
});

module.exports = router;