const player = document.getElementById('player');
const object1 = document.getElementById('object1');
const object2 = document.getElementById('object2');
const scoreDisplay = document.getElementById('score').querySelector('span');
const gameOverMenu = document.getElementById('game-over-menu');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const backgroundMusic = document.getElementById('background-music');
const startMenu = document.getElementById('start-menu');
const startButton = document.getElementById('start-button');

let score = 0;
let gameOver = false;
let playerX = 370; // المركز الأفقي للاعب
let object1Speed = 0.5; // السرعة الأولية للجسم الأول (أبطأ)
let object2Speed = 0.8; // السرعة الأولية للجسم الثاني (أبطأ)

// إخفاء قائمة البدء في البداية
startMenu.style.display = 'block';

// بدء اللعبة عند النقر على زر البدء
startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    backgroundMusic.play();
    moveObjects();
});

// تحريك اللاعب يمينًا ويسارًا
document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    if (event.key === 'ArrowLeft' && playerX > 0) {
        playerX -= 10;
    } else if (event.key === 'ArrowRight' && playerX < 740) {
        playerX += 10;
    }

    player.style.left = `${playerX}px`;
});

// تحريك الأجسام
function moveObjects() {
    if (gameOver) return;

    const object1Rect = object1.getBoundingClientRect();
    const object2Rect = object2.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    // تحريك الجسم الأول
    object1.style.top = `${object1Rect.top + object1Speed}px`;
    if (object1Rect.bottom > 600) {
        object1.style.top = '0';
        object1.style.left = `${Math.random() * 760}px`;
    }

    // تحريك الجسم الثاني
    object2.style.top = `${object2Rect.top + object2Speed}px`;
    if (object2Rect.bottom > 600) {
        object2.style.top = '0';
        object2.style.left = `${Math.random() * 760}px`;
    }

    // زيادة السرعة تدريجيًا (بمعدل أبطأ)
    object1Speed += 0.001; // زيادة السرعة ببطء
    object2Speed += 0.001; // زيادة السرعة ببطء

    // التحقق من التقاط الجسم الأول
    if (isColliding(playerRect, object1Rect)) {
        score++;
        scoreDisplay.textContent = score;
        object1.style.top = '0';
        object1.style.left = `${Math.random() * 760}px`;
    }

    // التحقق من سقوط الجسم الثاني
    if (isColliding(playerRect, object2Rect)) {
        gameOver = true;
        showGameOverMenu();
    }

    requestAnimationFrame(moveObjects);
}

// التحقق من التصادم
function isColliding(rect1, rect2) {
    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

// عرض قائمة الخسارة
function showGameOverMenu() {
    finalScoreDisplay.textContent = score;
    gameOverMenu.style.display = 'block';
}

// إعادة اللعب
restartButton.addEventListener('click', () => {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = score;
    gameOverMenu.style.display = 'none';
    object1Speed = 0.5; // إعادة تعيين السرعة الأولية
    object2Speed = 0.8; // إعادة تعيين السرعة الأولية
    object1.style.top = '0';
    object2.style.top = '0';
    playerX = 370;
    player.style.left = `${playerX}px`;
    moveObjects();
});