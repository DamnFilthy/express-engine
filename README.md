# express-engine 
`version: alpha 0.0.1`

*В мире php множество готовых решений и cms систем для создания многостраничных сайтов, порталов, магазинов и тд. 
Но в мире javascript ситуация иная, 
многие списывают это на то что, такого рода сайты и cms системы прерогатива исключительно php, я считаю это связано с тем что node.js появилась относительно недавно,
не успела обрасти похожими решениями и теперь используется для других целей, ведь зачем делать сайт на голом express если есть wordpress (как пример)*

![This is an image](https://raw.githubusercontent.com/DamnFilthy/express-engine/master/client/media/images/site-logo.png)

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
| server | Серверные файлы   | Создаем любые папки и файлы для работы на сервере   |
| client | Компилирующиеся файлы   | Вся работа с шаблонами, стилями и javascript   |
| client > pages | Страницы | Страницы сайта |
| client > components| Компоненты | Отдельные маленькие части |
| client > global| Глобальные стили и js   | js код и стили проекта или vendor глобальные для всего проекта |
| client > media| Медиа файлы   | Все картинки, видео, документы и тд проекта |
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
- Для получения конкретной ссылки - функция getScriptLocation `const getScriptLocation = require("../utils/getScript");` 
- Передать на вход тип файла и название страницы `const jsName = getScriptLocation('jsType', 'home');`
- Передать в шаблон:
``` 
publicRouter.js 

const pageScriptVendor = getScriptLocation('jsTypeVendor');
res.render('pages/home/home', {
    pageScriptVendor,
})
```
------------------------------------------------------------------------------------------------------------
- Для получения всех данных - `const { getAllScripts} = require("../utils/getScript");`
- Передать имя страницы и массив компонентов которые есть на странице:
- Передать в шаблон: 
```
publicRouter.js 

const allScripts = getAllScripts('home', ['header', 'footer', 'sidebar'])
res.render('pages/home/home', {
    allScripts
})
```
- Для глобальных стилей и скриптов передаем без имени страницы 
------------------------------------------------------------------------------------------------------------
- При использовании кастомных компонентов стили и скрипты передаем со страницы в сам компонент:
```
/pages/about.ejs

<%- include('../../components/header/header', {scripts: allScripts.components}); %>
<%- include('../../components/sidebar/sidebar', {scripts: allScripts.components}); %>
<%- include('../../components/footer/footer', {scripts: allScripts.components}); %>
```
- И в файле компонента так же используем как и на странице:
```
/components/header.ejs

<link rel="stylesheet" href="<%= scripts.header.cssScript %>">
<script src="<%= scripts.header.jsScript %>"></script>
```

#### Список ключей для испорта стилей и скриптов
| Type | Путь    | Описание   |
| :---:   | :---: | :---: |
| cssType | 'public/css/pages/'   | Стили страницы   |
| cssTypeMain | 'public/css/styles/main'   | Общие стили проекта   |
| cssTypeVendor | 'public/css/styles/vendor' | Внешние стили | 
| cssTypeComponent | 'public/css/components/',| Стили компонента |
| jsType | 'public/js/pages/'   | Скрипт страницы |
| jsTypeMain | 'public/js/js-main/'   | Общие скрипты проекта |
| jsTypeVendor | 'public/js/js-vendor/'  | Внешние скрипты   |
| jsTypeComponent | 'public/js/components/'  | Скрипты компонента   |

`По этим ключам можно получать отдельно каждый файл из функции getScriptLocation(type, page)`
`Или через получить все getAllScripts(page, ['header', 'footer', 'sidebar'])`

###### Все страницы и компоненты хэшируются

В планах:
- sequelize / быстрое подключение базы
- стартовый шаблон как фундамент для cms на express
