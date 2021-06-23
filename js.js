"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';
        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);

                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    render(snakePointsArray, foodPoint, blockPoint) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

        //добавляем клетку блока
        const blockCell = this.cells[`x${blockPoint.x}_y${blockPoint.y}`];
        blockCell.classList.add('block');
        // console.log(blockCell);
        this.usedCells.push(blockCell);
    },
};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,
    config,
    foodEatCount: 0, // счетчик для съеденой еды

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some((snakePoint) => {
            return snakePoint.x === point.x && snakePoint.y === point.y;
        });
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextStepHeadPoint());
        this.getBody().pop();
    },

    makeTeleport() {// шаг в бездну
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getTeleportPoint());
        this.getBody().pop();
    },

    growUp() {
        const lastBodyIndex = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        this.getBody().push(lastBodyPointClone);

        this.foodEatCount++; // +1 при каждом росте
        // console.log(this.foodEatCount);

    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch(this.direction) {
            case 'up':
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'right':
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'down':
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'left':
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    },

    getTeleportPoint(){ //точка телепортации на противоположную сторону
        // const firstPoint = this.getBody()[0];
        const nextPoint = this.getNextStepHeadPoint();

    if (nextPoint.x<0){
                return {x: this.config.getRowsCount()-1, y: nextPoint.y};
    } else if(nextPoint.x>=this.config.getRowsCount()) {
                return {x: 0, y: nextPoint.y};
    } else if (nextPoint.y<0){
                return {x: nextPoint.x, y: this.config.getColsCount()-1};
    } else if(nextPoint.y>=this.config.getColsCount()) {
                return {x: nextPoint.x, y: 0};
    } else return this.getNextStepHeadPoint();

    },
    
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const block = { //скопируем блок из логики еды - объекта food
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    block,
    status,
    tickInterval: null,


    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.log(err);
            }

            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.block.setCoordinates(this.getRandomFreeCoordinates()); // координаты блока
        this.snake.foodEatCount = 0; // сбрасываем счетчик еды

        this.render();
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => {
            this.tickHandler();
        }, 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish();

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            this.block.setCoordinates(this.getRandomFreeCoordinates());
            
            if (this.isGameWon()) this.finish();
        }

        //логика для блока
        if (this.block.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.finish();// столкновение
        }

        //логика для телепортации
        if (!this.stepToAbyss()){
            this.snake.makeTeleport();
        } else{
            this.snake.makeStep();
        }
        this.render();
        this.setFoodCount();
    },

    stepToAbyss(){
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        return nextHeadPoint.x < this.config.getColsCount() &&
        nextHeadPoint.y < this.config.getRowsCount() &&
        nextHeadPoint.x >= 0 &&
        nextHeadPoint.y >= 0;
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isOnPoint(nextHeadPoint) 
    },

    setPlayButton(txt, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = txt;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), this.block.getCoordinates, ...this.snake.getBody()]; //добавляем координаты блока

        while(true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            // if (!exclude.some((exPoint) => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) return rndPoint;
            if (!exclude.some((exPoint) => {
                return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
            })) return rndPoint;
        }
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', (event) => {
            this.keyDownHandler(event);
        });
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    setFoodCount(){
        const foodCount = document.getElementById('count');
        foodCount.textContent = `Count: ${snake.foodEatCount}`;
        // console.log(foodCount);
    },

    render() {//добавляем координаты для блока
      this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.block.getCoordinates());
    },


};

game.init({speed: 5});
