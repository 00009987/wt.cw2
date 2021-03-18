const express = require('express');
const router = express.Router();

// compose page
router.get('/', (req, res) => res.render('index'));

module.exports = router;
