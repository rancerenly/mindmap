const express = require('express');
const router = express.Router();
const {
    getMindmap,
    getNodeById,
    searchNodesByName,
    exportToCSV
} = require('../controllers/mindmapController');

// Получить весь mind map
router.get('/', getMindmap);

// Получить узел по ID
router.get('/:id', getNodeById);

// Поиск узлов по названию
router.get('/search/:name', searchNodesByName);

// Скачать данные в формате CSV
router.get('/export/csv', exportToCSV);

module.exports = router;
