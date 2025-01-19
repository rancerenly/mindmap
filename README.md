# Глоссарий терминов ВКР и семантический граф

## Описание проекта

Проект представляет собой веб-приложение для визуализации и управления глоссарием терминов ВКР. Разработан в рамках практики в ИТМО.

### Реализованный функционал

1. **Бэкенд (Node.js/Express)**

   - REST API для доступа к терминам и их определениям
   - Структурированное хранение данных глоссария
   - Эндпоинты для получения терминов и связей между ними

2. **Фронтенд (JavaScript)**

   - Глоссарий терминов
   - Интерактивный семантический граф терминов
   - Визуализация связей между терминами

3. **Контейнеризация**
   - Docker-контейнеры для фронтенда и бэкенда
   - Docker Compose для оркестрации сервисов
   - Готовность к развертыванию на любой платформе

- **Фронтенд:**

  - Javascript
  - Cytoscape.js

- **Бэкенд:**

  - Node.js
  - Express.js

- **Контейнеризация:**
  - Docker
  - Docker Compose

## Инструкция по запуску

### Предварительные требования

1. Установленный Docker
2. Установленный Docker Compose
3. Git для клонирования репозитория

### Шаги по развертыванию

1. **Клонирование репозитория**

   ```bash
   git clone [https://github.com/caVenikk/itmo_practice](https://github.com/rancerenly/mindmap)
   cd mindmap
   ```

2. **Сборка и запуск контейнеров**

   ```bash
   docker-compose up --build
   ```

### Сайт

Сайт доступен по адресу [localhost:8080](localhost:8080)
