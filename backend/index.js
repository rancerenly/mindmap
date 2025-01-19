const express = require('express');
const cors = require('cors');
const mindmapRoutes = require('./routes/mindmap');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Подключение маршрутов
app.use('/mindmap', mindmapRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
