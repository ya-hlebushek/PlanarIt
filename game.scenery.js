var gameW = 2000, gameH = 800;
var canvas, context;
var curX, curY;
var field = [[90,90],[200,100],[100,200],[310,50]];
var edges = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
var selectedCircle;

function onLoad()
{
  curX = 0; curY = 0;
  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  canvas.width = gameW;
  canvas.height = gameH;
  document.body.appendChild(canvas);
  document.body.addEventListener('mousemove',  mouseMove,  false);
  document.body.addEventListener('mousedown',  mouseDown,  false);
  document.body.addEventListener('mouseup',    mouseUp,    false);
  draw();
}

  function moveCircle()
  {
    field[selectedCircle][0] = curX;
    field[selectedCircle][1] = curY;
    draw();
  }

  function selectCircle()
  {
    selectedCircle = undefined;
    var x, y;
    var xdis, ydis;
    var dis;
    var minDis = 100 * 100;
    for (var i = 0; i < field.length; i++)
    {
      x = field[i][0];
      y = field[i][1];
      xdis = x - curX;
      ydis = y - curY;
      dis = xdis * xdis + ydis * ydis;
      if(dis < minDis)
      {
        minDis = dis;
        selectedCircle = i;
      }
    }
  }

  function draw()
  {
    context.clearRect(0,0,gameW,gameH);
    var x, y;
    var c0, c1;

    context.lineWidth = 2;
    for(var i = 0; i < edges.length; i++)
    {
      t0 = field[edges[i][0]];
      t1 = field[edges[i][1]];
      context.beginPath();
      context.moveTo(t0[0], t0[1]);
      context.lineTo(t1[0], t1[1]);
      context.closePath();
      context.stroke();
    }

    for(var i = 0; i < field.length; i++)
    {
      x = field[i][0];
      y = field[i][1];
      drawCirclePath(17,x,y);
      context.fill();
    }
  }

  function drawCirclePath(R,X,Y)
  {
    context.beginPath();
    context.arc(X,Y,R,0, Math.PI*2, true);
    context.closePath();
  }

  function updateCursorPos(event)
  {
    curX = event.pageX - canvas.offsetLeft;
    curY = event.pageY - canvas.offsetTop;
    if (curX > gameW)
      curX = gameW;
    else if (curX < 0)
      curX = 0;
    if (curY > gameH)
      curY = gameH;
    else if (curY < 0)
      curY = 0;
  }

  function mouseDown(event)
  {
    updateCursorPos(event);
    selectCircle();
    moveCircle();
  }

  function mouseUp(event)
  {
    selectedCircle = undefined;
    draw();
  }

  function mouseMove(event)
  {
    updateCursorPos(event);
    moveCircle();
  }
