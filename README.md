# express-engine 
`version: alpha 0.0.1`

*В мире php множество готовых решений и cms систем для создания многостраничных сайтов, порталов, магазинов и тд. 
Но в мире javascript ситуация иная, 
многие списывают это на то что, такого рода сайты и cms системы прерогатива исключительно php, я считаю это связано с тем что node.js появилась относительно недавно,
не успела обрасти похожими решениями и теперь используется для других целей, ведь зачем делать сайт на голом express если есть wordpress (как пример)*

![This is an image](https://github.com/DamnFilthy/express-engine/blob/master/github/logo/Group%2044.png)

###### Этот проект не является фреймворком или даже оберткой над express, скорее неким шаблоном для разработки многострачных сайтов (или чего угодно)

###### express-engine создан для решения нескольких проблем:
       1. **Оптимизация: разбиение на чанки всего проекта (js, css, ejs)**
       2. Возможность в одиночку делать фулстек приложения
       3. Удобная работа в команде (фронт + бэк) не мешая друг другу

* Установка

     > npm i
     
 * Запуск dev/prod
 
       npm run dev 
       dev: source-maps, nodemon, file change observer, restarter, terminal logs (backend, frontend)

       npm run prod
       prod: del source-maps, no-logs, fast


#### Структура проекта
| Папка | Назначение    | Описание   |
| :---:   | :---: | :---: |
| Верхний уровень | Серверные файлы   | Создаем любые папки и файлы для работы на сервере   |
| src | Компилирующиеся файлы   | Вся работа с шаблонами, стилями и javascript   |
| src > pages | Страницы | Страницы сайта |
| src > components| Компоненты | Отдельные маленькие части |
| src > global| Глобальные стили и js   | js код и стили проекта или vendor глобальные для всего проекта |
| src > media| Медиа файлы   | Все картинки, видео, документы и тд проекта |
| public | Скомпилированные файлы   | файлы и папки генерируются автоматически   |

#### Структура страницы/компонента

| Файл | Назначение    | Описание   |
| :---:   | :---: | :---: |
| name.ejs | Шаблон страницы   | Разметка и шаблонизатор конкретной страницы   |
| name.css/sass/scss | Стили в любом формате   | Стили для конкретной страницы/Компонента  |
| name.js | javascript код   | использующийся только на этой странице/компоненте   |

#### Подключаем стили и скрипты (глобальные и для конкретной страницы)

```
<head>
    <link rel="stylesheet" href="<%= pageCssVendor %>"> // Глобальные вендор стили
    <link rel="stylesheet" href="<%= pageCssMain %>"> // Глобальные стили приложения
    <link rel="stylesheet" href=" <%= pageCss %> "> // Стили текущей страницы
</head>
<body>
    ... 
    <script src="<%= pageScriptVendor %>"></script> // Глобальный js вендор
    <script src="<%= pageScriptMain %>"></script> // Глобальный js приложения
    <script src=" <%= pageScript %> "></script> // Javascript текущей страницы
</body>
```

#### Как передавать стили и js в шаблоны:
- Использовать функцию getScriptLocation `const getScriptLocation = require("../utils/getScript");` 
- Передать на вход тип файла и название страницы `const jsName = getScriptLocation('jsType', 'home');`
- Для глобальных стилей и скриптов передаем без имени страницы 
- Передать в шаблон:
``` 
const pageScriptVendor = getScriptLocation('jsTypeVendor'),
            pageScriptMain = getScriptLocation('jsTypeMain'),
            pageScript = getScriptLocation('jsType', 'home'),
            pageCssVendor = getScriptLocation('cssTypeVendor'),
            pageCssMain = getScriptLocation('cssTypeMain'),
            pageCss = getScriptLocation('cssType', 'home');

        res.render('pages/home/home', {
            title: 'Main Page',
            pageTitle: 'Главная страница',
            pageScriptVendor,
            pageScriptMain,
            pageScript,
            pageCssVendor,
            pageCssMain,
            pageCss
        })
```
- При использовании кастомных компонентов стили и скрипты для них подключаются вручную:
```
<link rel="stylesheet" href="/public/css/components/sidebar/sidebar.min.css">
<script src="/public/js/components/sidebar/sidebar-min.min.js"></script>
```
- Пути в public идентичны по структуре в src

###### Суть: подключить данный шаблон и начать сразу делать сайт не думая про оптимизацию (при масштабировании) 

В планах:
- sequelize / быстрое подключение базы
- стартовый шаблон как фундамент для cms на express
