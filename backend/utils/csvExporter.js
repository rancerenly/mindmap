const { parse } = require('json2csv');

const generateCSV = (data) => {
    const nodes = data.nodes.map((node) => ({
        ID: node.id,
        Название: node.label
    }));

    const edges = data.edges.map((edge) => ({
        Источник: edge.source,
        Цель: edge.target,
        Связь: edge.label
    }));

    const csvNodes = parse(nodes, { fields: ['ID', 'Название'] });
    const csvEdges = parse(edges, { fields: ['Источник', 'Цель', 'Связь'] });

    return `# Узлы\n${csvNodes}\n\n# Связи\n${csvEdges}`;
};

module.exports = { generateCSV };
