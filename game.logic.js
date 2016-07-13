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
