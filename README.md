# INCHAPIN — Лендинг жилого комплекса

Промо-лендинг для премиального жилого комплекса INCHAPIN. Одностраничный сайт с hero-секцией, блоком «О проекте», видео о комплексе и модальной формой обратного звонка.

## Стек

| Слой | Технология |
|------|-----------|
| Фреймворк | Next.js 16 (App Router) |
| UI | React 19 |
| Типизация | TypeScript 5 (strict) |
| Стили | SCSS Modules + CSS custom properties |
| Валидация форм | Zod 4 |
| Маска ввода | react-imask |
| Анимации | react-transition-group |
| Скролл | smooth-scrollbar |
| HTTP | axios |

## Запуск

```bash
npm install
npm run dev
```

Приложение доступно на `http://localhost:3000`.

## Скрипты

```bash
npm run dev          # dev-сервер с HMR
npm run build        # production-сборка
npm run start        # запуск production-сервера
npm run lint         # ESLint
npm run lint:fix     # ESLint с автофиксом
npm run format       # Prettier (запись)
npm run format:check # Prettier (проверка)
```

## Структура проекта

```
├── app/
│   ├── api/rutube/route.ts   # Серверный прокси для Rutube API
│   ├── layout.tsx            # Root layout, метаданные
│   └── page.tsx
│
├── components/
│   ├── containers/
│   │   ├── PageWrapper/      # Корневой контейнер, управляет состоянием модалки
│   │   └── ScrollContainer/  # Обёртка над smooth-scrollbar
│   ├── sections/
│   │   ├── Main/             # Hero-секция с INCHAPIN и фоновым изображением
│   │   └── SecondScreen/     # Блок «О проекте» с изображением и видео
│   └── widgets/
│       ├── Header/           # Шапка с логотипом, навигацией, номером телефона
│       ├── Modal/            # Модалка «Заказать звонок» (динамический импорт)
│       └── VideoBlock/       # Блок с видео о проекте (Rutube embed)
│
├── shared/
│   ├── hooks/
│   │   └── useVideoDuration  # Загружает длительность видео с Rutube
│   └── ui/
│       ├── Button/
│       ├── Burger/
│       ├── Input/
│       ├── Select/
│       └── Typography/
│
├── assets/icons/             # SVG-иконки как React-компоненты
│
├── constants/
│   ├── colors.ts             # Ссылки на CSS custom properties (var(--color-X))
│   ├── contactForm.ts        # EMPTY_FORM — дефолтные значения формы
│   └── rutube.ts             # RUTUBE_ID, EMBED_URL
│
├── schemas/
│   └── contactForm.ts        # Zod-схема валидации формы
│
├── services/
│   └── rutube.ts             # Клиент Rutube API (через серверный прокси)
│
└── styles/
    ├── variables.scss         # Цветовые токены + CSS custom properties + брейкпоинты
    ├── mixins.scss            # Адаптивные миксины (@include mobile / tablet / …)
    ├── fonts.scss             # Подключение Proxima Nova
    └── globals.scss           # Глобальные сбросы
```

## Адаптивность

| Брейкпоинт | Диапазон |
|-----------|---------|
| `mobile` | ≤ 767px |
| `tablet` | 768px – 1023px |
| `small-desktop` | 1024px – 1280px |
| `desktop` | 1281px – 1769px |
| `wide` | ≥ 1770px |

Брейкпоинты объявлены в `styles/variables.scss`, подключаются через миксины из `styles/mixins.scss`.

## Цветовые токены

Единый источник правды — `styles/variables.scss`. SCSS-переменные и CSS custom properties объявлены в одном месте:

```scss
$color-blue: #2f80ed;
// ...

:root {
  --color-blue: #{$color-blue};
  // ...
}
```

В SCSS-модулях используются `$color-blue`, в TSX — `var(--color-blue)` через `constants/colors.ts`.

## Серверный прокси Rutube

Rutube API не поддерживает CORS для браузерных запросов, поэтому запрос длительности видео проксируется через Next.js API Route:

```
Browser → GET /api/rutube?id=… → app/api/rutube/route.ts → https://rutube.ru/api/video/…
```

## Переменные окружения

Проект не требует `.env` файлов — Rutube API публичный и не требует ключей.
