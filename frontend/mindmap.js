const API_BASE_URL = "http://backend:3000/mindmap";

let cy;

async function fetchMindMapData() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Ошибка при запросе данных:", error);
        return null;
    }
}

// Функция для инициализации mind map
async function initializeMindMap() {
    const data = await fetchMindMapData();

    if (!data) {
        console.error("Не удалось загрузить данные.");
        return;
    }

    const elements = [
        ...data.nodes.map((node) => ({
            data: { id: node.id, label: node.label, description: node.description || "Нет описания" },
        })),
        ...data.edges.map((edge) => ({
            data: { source: edge.source, target: edge.target, label: edge.label },
        })),
    ];

    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: elements,
        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(label)',
                    'background-color': '#f9c2d1',
                    'shape': 'rectangle',
                    'width': 'label',
                    'height': 'label',
                    'text-halign': 'center',
                    'text-valign': 'center',
                    'color': '#333',
                    'padding': '10px',
                    'border-width': 2,
                    'border-color': '#e89ab4',
                },
            },
            {
                selector: 'edge',
                style: {
                    'label': 'data(label)',
                    'width': 2,
                    'line-color': '#888',
                    'target-arrow-color': '#888',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                    'font-size': '12px',
                    'text-background-opacity': 1,
                    'text-background-color': '#fff',
                    'text-background-shape': 'roundrectangle',
                    'text-background-padding': 3,
                    'text-margin-y': -10,
                    'z-index': 10,
                },
            },
        ],
        layout: {
            name: 'cose',
            nodeRepulsion: 10000,
            idealEdgeLength: 150,
            coolingFactor: 0.95,
            animate: true,
            fit: true,
            maxSimulationTime: 5000,
            nodeSpacing: 50,
        },
    });

    // Добавляем событие для показа описания при наведении
    cy.on('mouseover', 'node', (evt) => {
        const node = evt.target;
        const description = node.data('description');
        showTooltip(evt.originalEvent.pageX, evt.originalEvent.pageY, description);
    });

    // Убираем подсказку, когда курсор покидает узел
    cy.on('mouseout', 'node', () => {
        hideTooltip();
    });
}

// Показываем всплывающую подсказку
function showTooltip(x, y, description) {
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        document.body.appendChild(tooltip);
    }
    tooltip.textContent = description;
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.style.display = 'block';
}

// Скрываем всплывающую подсказку
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

// Инициализируем карту
initializeMindMap();
