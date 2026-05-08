# Tetris Node

```text
████████╗███████╗████████╗██████╗ ██╗███████╗
╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██║██╔════╝
   ██║   █████╗     ██║   ██████╔╝██║███████╗
   ██║   ██╔══╝     ██║   ██╔══██╗██║╚════██║
   ██║   ███████╗   ██║   ██║  ██║██║███████║
   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝
```

Простая игра Tetris, работающая прямо в терминале. Проект построен на `Node.js` и библиотеке `blessed`.

## Возможности

- игра в Tetris внутри терминала
- предпросмотр следующей фигуры
- подсчет очков, уровня и очищенных линий
- пауза
- меню после окончания игры
- отображение ghost piece

## Требования

- рекомендуется `Node.js` 16+

## 🚀 Установка через NPM

```bash
npm i -g @mr1xyyy/tetris-cli

# Start it
tetris
```

## Запуск

```bash
node src/index.js
```

## Управление

- `Left Arrow`: движение влево
- `Right Arrow`: движение вправо
- `Down Arrow`: ускоренное опускание
- `Up Arrow`: поворот фигуры
- `Space`: hard drop
- `P`: пауза
- `R`: перезапуск
- `Esc`: возврат в меню
- `Tab`: переключение между пунктами меню
- `Enter`: выбор
- `Ctrl + C`: выход из программы

## Правила игры

- каждые 10 очищенных линий повышают уровень
- с повышением уровня игра ускоряется
- hard drop дает дополнительные очки
- очистка нескольких линий сразу приносит больше очков

## Структура проекта

```text
src/
  core/
    board.js
    logic.js
    pieces.js
  ui/
    constants.js
    render-utils.js
    screen.js
    view-builders.js
  game.js
  index.js
headers.txt
```

## Архитектура

- [src/index.js](/abs/path/d:/Projects/tetris-node/src/index.js): точка входа и игровой цикл
- [src/game.js](/abs/path/d:/Projects/tetris-node/src/game.js): состояние игры и основная игровая логика
- [src/core/logic.js](/abs/path/d:/Projects/tetris-node/src/core/logic.js): collision, merge, rotate и очистка линий
- [src/core/pieces.js](/abs/path/d:/Projects/tetris-node/src/core/pieces.js): описание фигур Tetris
- [src/ui/screen.js](/abs/path/d:/Projects/tetris-node/src/ui/screen.js): UI flow и обработка действий
- [src/ui/view-builders.js](/abs/path/d:/Projects/tetris-node/src/ui/view-builders.js): построение blessed-интерфейсов
- [src/ui/render-utils.js](/abs/path/d:/Projects/tetris-node/src/ui/render-utils.js): helpers для рендера поля и следующей фигуры

