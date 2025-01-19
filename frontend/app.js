function resetCanvas() {
    if (!cy) return;

    cy.fit(cy.elements(), 50); // 50 - отступ от границ
}


// Логика для меню настроек
const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');

settingsButton.addEventListener('click', () => {
    settingsMenu.classList.toggle('hidden');
});

// Закрытие меню, если кликнули вне его
document.addEventListener('click', (event) => {
    if (!settingsMenu.contains(event.target) && event.target !== settingsButton) {
        settingsMenu.classList.add('hidden');
    }
});

// Обработчик кнопки "Сбросить канвас"
document.getElementById('resetCanvasButton').addEventListener('click', resetCanvas);

// Функция для поиска узлов по названию
function searchNodeByName(name) {
    if (!cy) return;

    // Сбрасываем стиль всех узлов
    cy.nodes().style({
        'border-color': '#e89ab4',
        'border-width': 2,
    });

    // Ищем узлы, соответствующие названию
    const foundNodes = cy.nodes().filter((node) =>
        node.data('label').toLowerCase().includes(name.toLowerCase())
    );

    if (foundNodes.length > 0) {
        // Выделяем найденные узлы
        foundNodes.style({
            'border-color': '#0074D9',
            'border-width': 4,
        });
        cy.fit(foundNodes, 50); // Центрируем граф на найденных узлах
    } else {
        alert("Термин не найден");
    }
}

// Обработчик кнопки "Поиск"
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput) {
        searchNodeByName(searchInput);
    } else {
        alert("Введите название термина для поиска");
    }
});

// Обработчик нажатия Enter в поле ввода
document.getElementById('searchInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchInput = event.target.value.trim();
        if (searchInput) {
            searchNodeByName(searchInput);
        } else {
            alert("Введите название термина для поиска");
        }
    }
});
document.getElementById('viewTermsButton').addEventListener('click', () => {
    window.location.href = 'terms.html';
});

document.getElementById('downloadJSONButton').addEventListener('click', downloadJSON);

document.getElementById('downloadCSVButton').addEventListener('click', downloadCSV);

async function downloadCSV() {
    try {
        const response = await fetch(API_BASE_URL + '/export/csv');

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mindmap.csv';
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Ошибка при загрузке CSV:", error);
    }
}

async function downloadJSON() {
    try {
        const response = await fetch(API_BASE_URL + '/export/json');

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'terms.json';
        document.body.appendChild(a);
        a.click();


        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Ошибка при загрузке JSON:", error);
    }
}



// Инициализация графа
initializeMindMap();
