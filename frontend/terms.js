const API_BASE_URL = "http://localhost:3000/mindmap";

// Функция для получения данных с бэкенда
async function fetchTermsData() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Ошибка при запросе данных о терминах:", error);
        return [];
    }
}

// Функция для отображения терминов
async function displayTerms() {
    const termsContainer = document.getElementById('termsContainer');
    const termsData = await fetchTermsData();

    if (!termsData.nodes || termsData.nodes.length === 0) {
        termsContainer.innerHTML = "<p>Не удалось загрузить данные о терминах.</p>";
        return;
    }
    const nodes = termsData.nodes;
    console.log(nodes);
    nodes.forEach((term) => {
        const card = document.createElement('div');
        card.className = 'term-card';
        card.innerHTML = `
            <h2>${term.label}</h2>
            <p>${term.description}</p>
            <a href="${term.source}" target="_blank">Подробнее</a>
        `;
        termsContainer.appendChild(card);
    });
}

// Добавляем обработчик для кнопки "Вернуться к канвасу"
document.getElementById('backToCanvasButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Отображаем термины при загрузке страницы
displayTerms();



document.getElementById('backToCanvasButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

