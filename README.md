# Общие сведения
## Для чего этот репозитарий
Данный репозитарий содержит обвязку, интерфейсы и примеры для разработки и сборки виджетов платформы SemNext для последующей загрузки в магазин виджетов. 

## С чего начать
1. Склонируйте репозиторий себе на диск
``git clone git@github.com:inspark/web-widget-container.git``

2. Установите зависимости
```npm i ```

3. Запустите проект
``npm run start``


## Как добавить свой виджет

1. Замените адрес репозитория или сделайте форк проекта
``git remote add origin <адрес вашего репозитория>``

2. Добавьте ваш виджет в папку src/app/widgets/widget-<название виджета>/widget.<название виджета>.ts

3. Подключите виджет к проекту 
В  src/app/panel/dashboard-panel.component.ts заменить строчку ```import WidgetComponent from '../widgets/widget-event/widget.event';```
на путь к вашему виджету

4. Запустите проект
``npm run start``

##  Локализация виджета

1. Пометить все необходимые строки для перевода, согласно документации @ngx-translate/core
В .html файлах через ``pipe translate``, например ``{{'Hello' | translate}}``
В .ts файлах через функцию ``_``, например ``import {_} from '@inspark/widget-common'; _('Hello');``

2. Запустить экстрактор строк для перевода
Для Unix систем
``sh locale.sh <название виджета>``

3. Перевести все строки в файлах i18n/ru.json, i18n/en.json в папке виджета

## Как загрузить виджет в магазин
1. Запустите сборку виджета
Для Unix систем
``sh build.sh <название виджета>``

2. Зайти на сайт магазина и загрузить файл build/release.zip
