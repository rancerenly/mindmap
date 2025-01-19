const express = require('express');
const router = express.Router();
const {
    getMindmap,
    getNodeById,
    searchNodesByName,
    exportToCSV,
    exportToJson
} = require('../controllers/mindmapController');

router.get('/', getMindmap);
router.get('/:id', getNodeById);
router.get('/search/:name', searchNodesByName);
router.get('/export/csv', exportToCSV);
router.get('/export/json', exportToJson);

module.exports = router;
