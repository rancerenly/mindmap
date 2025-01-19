const mindmapData = require('../data/mindmap.json');
const { generateCSV } = require('../utils/csvExporter');
const path = require('path');

const getMindmap = (req, res) => {
    res.json(mindmapData);
};

const getNodeById = (req, res) => {
    const id = req.params.id;
    const node = mindmapData.nodes.find((node) => node.id === id);
    if (node) {
        res.json(node);
    } else {
        res.status(404).json({ message: `Узел с ID "${id}" не найден` });
    }
};

const searchNodesByName = (req, res) => {
    const name = req.params.name.toLowerCase();
    const results = mindmapData.nodes.filter((node) =>
        node.label.toLowerCase().includes(name)
    );
    res.json(results);
};

const exportToCSV = (req, res) => {
    const csvData = generateCSV(mindmapData);
    res.header('Content-Type', 'text/csv');
    res.attachment('mindmap.csv');
    res.send(csvData);
};


const exportToJson = (req, res) => {
    const filePath = path.join(__dirname, '../data/mindmap.json');
    res.download(filePath, 'terms.json', (err) => {
        if (err) {
            console.error("Ошибка при отправке файла:", err);
            res.status(500).json({ message: 'Ошибка при скачивании файла.' });
        }
    });
};


module.exports = {
    getMindmap,
    getNodeById,
    searchNodesByName,
    exportToCSV,
    exportToJson
};
