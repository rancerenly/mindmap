const mindmapData = require('../data/mindmap.json');
const { generateCSV } = require('../utils/csvExporter');

// Получить весь mind map
const getMindmap = (req, res) => {
    res.json(mindmapData);
};

// Получить узел по ID
const getNodeById = (req, res) => {
    const id = req.params.id;
    const node = mindmapData.nodes.find((node) => node.id === id);
    if (node) {
        res.json(node);
    } else {
        res.status(404).json({ message: `Узел с ID "${id}" не найден` });
    }
};

// Поиск узлов по названию
const searchNodesByName = (req, res) => {
    const name = req.params.name.toLowerCase();
    const results = mindmapData.nodes.filter((node) =>
        node.label.toLowerCase().includes(name)
    );
    res.json(results);
};

// Экспорт данных в CSV
const exportToCSV = (req, res) => {
    const csvData = generateCSV(mindmapData);
    res.header('Content-Type', 'text/csv');
    res.attachment('mindmap.csv');
    res.send(csvData);
};

module.exports = {
    getMindmap,
    getNodeById,
    searchNodesByName,
    exportToCSV,
};
