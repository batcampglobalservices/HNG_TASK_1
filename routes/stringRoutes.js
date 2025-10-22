const express = require('express');
const StringController = require('../controllers/stringController');

const router = express.Router();

router.post('/strings', StringController.createString);
router.get('/strings/:string_value', StringController.getString);
router.get('/strings', StringController.getAllStrings);
router.get('/strings/filter-by-natural-language', StringController.filterByNaturalLanguage);
router.delete('/strings/:string_value', StringController.deleteString);

module.exports = router;