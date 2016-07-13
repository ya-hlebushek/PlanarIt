const fieldWidth = 1000, fieldHeight = 800;
var canvas, ctx, cursorPosX, cursorPosY, selectedPoint;

if (gameSession === undefined) var gameSession = {};

function initialize() {
    gameSession.createLayout();
    cursorPosX = 0; cursorPosY = 0;
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = fieldWidth;
    canvas.height = fieldHeight;
    document.body.appendChild(canvas);
    document.body.addEventListener('mousemove',  mouseMove,  false);
    document.body.addEventListener('mousedown',  mouseDown,  false);
    document.body.addEventListener('mouseup',    mouseUp,    false);
    draw();
}

function movePoint() {
    gameSession.points[selectedPoint].x = cursorPosX;
    gameSession.points[selectedPoint].y = cursorPosY;
    draw();
}

function selectPoint() {
    selectedPoint = undefined;
    let x, y, xDis, yDis, dis, minDis = Math.PI * (radius * radius) / 2;
    for (let i = 0; i < gameSession.points.length; ++i) {
        x = gameSession.points[i].x;
        y = gameSession.points[i].y;
        xDis = x - cursorPosX;
        yDis = y - cursorPosY;
        dis  = xDis * xDis + yDis * yDis;
        if (dis <= minDis) { minDis = dis; selectedPoint = i };
    }
}

function draw() {
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    let x, y;
    ctx.lineWidth = 2;
    for (let i = 0, t0, t1; i < gameSession.edges.length; ++i) {
        t0 = gameSession.points[gameSession.edges[i].beginPoint];
        t1 = gameSession.points[gameSession.edges[i].endPoint];
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgb(0, 0, 0)';
        ctx.strokeStyle = '#98FB98';
        ctx.beginPath();
        ctx.moveTo(t0.x, t0.y);
        ctx.lineTo(t1.x, t1.y);
        ctx.closePath();
        ctx.stroke();
    }
    for (let i = 0; i < gameSession.points.length; ++i) {
        x = gameSession.points[i].x;
        y = gameSession.points[i].y;
        drawPointPath(radius, x, y);
        ctx.fillStyle = '#333';
        ctx.fill();
    }
}

function drawPointPath(r, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
}

function getMouseCoords(event) {
    cursorPosX = event.pageX - canvas.offsetLeft;
    cursorPosY = event.pageY - canvas.offsetTop;
    if (cursorPosX > fieldWidth - radius) cursorPosX = fieldWidth - radius;
    else if (cursorPosX < radius) cursorPosX = radius;
    if (cursorPosY > fieldHeight - radius) cursorPosY = fieldHeight - radius;
    else if (cursorPosY < radius) cursorPosY = radius;
}

function mouseDown(event) {
    getMouseCoords(event);
    selectPoint();
    movePoint();
}

function mouseUp(event) {
    selectedPoint = undefined;
    draw();
}

function mouseMove(event) {
    getMouseCoords(event);
    movePoint();
}

gameSession.createLayout = function() {
    gameSession.points = [];
    gameSession.edges  = [];
    let level = presetLevels[gameSession.currentLevel];
    for (let i = 0; i < level.points.length; ++i)
        gameSession.points.push(new gameSession.point(level.points[i].x, level.points[i].y, radius));
    for (let i = 0; i < level.edges.length; ++i)
        for (let j = 0; j < level.edges[i].length - 1; ++j)
            gameSession.edges.push(new gameSession.line(level.edges[i][j], level.edges[i][j + 1]));
};

gameSession.generateLayout = function(level) {

}

window.onload = initialize;