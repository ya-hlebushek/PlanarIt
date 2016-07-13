<<<<<<< HEAD
const radius = 17, EPS = 0.000001;

if (gameSession === undefined) var gameSession = {};

gameSession.point = function(x, y, radius) {
    this.x = x;
    this.y = y;
}

gameSession.line = function(p1, p2) {
    this.beginPoint = p1;
    this.endPoint = p2;
    this.beginCoords = gameSession.points[p1];
    this.endCoords = gameSession.points[p2];
    this.A = this.endCoords.y - this.beginCoords.y;
    this.B = this.beginCoords.x - this.endCoords.x;
    this.C = this.A * this.beginCoords.x + this.B * this.endCoords.y;
}

function isInSegment(a, b, c) {
    if (Math.abs(a - b) < EPS || Math.abs(b - c) < EPS) return false;
    return (a < b && b < c) || (c < b && b < a);
}

function isIntersecting(a, b) {
    if (a == b) return false;
    if (Math.abs(a.A * b.B - b.A * a.B) < EPS) return false;
    let delta   = a.A * b.B - b.A * a.B;
    let delta_x = b.B * a.C - a.B * b.C;
    let delta_y = a.A * b.C - b.A * a.C;
    x = delta_x / delta;
    y = delta_y / delta;
    if ((isInSegment(a.beginCoords.x, x, a.endCoords.x) || isInSegment(a.beginCoords.y, y, a.endCoords.y)) &&
        (isInSegment(b.beginCoords.x, x, b.endCoords.x) || isInSegment(b.beginCoords.y, y, b.endCoords.y)))
        return true;
    return false;
}

//TODO SOLVER (firebase)
//TODO RESULTS TABLE
=======
const radius = 17;

if (gameSession === undefined) var gameSession = {};
gameSession.currentLevel = 0;

gameSession.point = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

gameSession.line = function(p1, p2) {
    this.beginPoint = p1;
    this.endPoint = p2;
    this.beginCoords = gameSession.points[p1];
    this.endCoords = gameSession.points[p2];
    this.coords = { x: this.endCoords.x - this.beginCoords.x, y: this.endCoords.y - this.beginCoords.y };
    this.A = gameSession.points[p2].y - gameSession.points[p1].y;
    this.B = gameSession.points[p1].x - gameSession.points[p2].x;
    this.C = gameSession.points[p1].y * gameSession.points[p2].x - gameSession.points[p1].x * gameSession.points[p2].y;
}

function orientedArea(a, b) {
    return a.y * b.x - a.x * b.y;
}

function checkLineIntersection(a, b) {
    let va = a.coords,
        vb = { x: b.beginPoint.x - a.beginPoint.x, y: b.beginPoint.y - a.beginPoint.y},
        vc = { x: b.endPoint.x - a.beginPoint.x, y: b.endPoint.y - a.beginPoint.y };
    return orientedArea(va, vb) *
           orientedArea(va, vc) < 0;
}
>>>>>>> origin/master
