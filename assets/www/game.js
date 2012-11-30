bubble.game = (function() {
    var dom = bubble.dom;
    var $ = dom.$;

    var ballX,
        ballY,
        ballR;

    var ballCount;

    var timeoutVar;

    var scores;

    var scoreBoard;

    var webSocket;

    function drawBall() {
        var canvas = document.getElementById("draw-background"),
                ctx = canvas.getContext("2d");

        var background = $("#game #draw-background")[0],
            rect = background.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;

        // radi is in [0 .. 80]
        var radi = Math.floor(Math.random() * 80);

        if (radi < 15) {
            radi = 15;
        }

        // 產生位置
        var x = Math.floor(Math.random() * (rect.width - radi)),
            y = Math.floor(Math.random() * (rect.height - radi));

        ctx.beginPath();
        ctx.arc(x, y, radi, 0 * Math.PI, 2 * Math.PI, false);    
        ctx.closePath();   
        ctx.fill();

        ballX = x;
        ballY = y;
        ballR = radi;

        if (ballCount > 0) {
            ballCount = ballCount - 1;
            timeoutVar = setTimeout(drawBall, radi * 50);
        } else {
           document.getElementById("draw-background").removeEventListener("click", touchEvent, false);
            gameOver();
        }
    }

    function gameOver() {
        var obj = {
            name: "jollen",
            scores: scores
        };

        var json = JSON.stringify(obj);

        webSocket.send(json);
    }

    function touchEvent(e) {
        console.log("Click at X: " + e.clientX + ", Y: " + e.clientY);
        
        var x1, 
            x2,
            y1,
            y2;

        var clientX,
            clientY;

        clientX = e.clientX;
        clientY = e.clientY;

        // 四個角
		x1 = ballX - ballR;
		x2 = ballX + ballR;		
		y1 = ballY - ballR;
		y2 = ballY + ballR;

		if ((clientX > x1) && (clientX < x2)) {
			if ((clientY > y1) && (clientY < y2)) {
				scores = scores + (80 - ballR);
				console.log("Hit! Scores: " + scores);

                // DOM
				scoreBoard.innerHTML = "<h1>Scores: " + scores + "</h1>";
			}
		}

        // re-generate a ball
        clearTimeout(timeoutVar);
        drawBall();
    }

    function start() {
          // 初始化輸入事件
           document.getElementById("draw-background").addEventListener("click", touchEvent, false);

           drawBall();
    }

    function initialize () {
        ballCount = 10;
        scores = 0;

        scoreBoard = document.getElementById("score-board");

        bubble.websocket.createWebsocket();
        webSocket = bubble.websocket.getWebSocket();

        start();
    }

    return {
        initialize: initialize
    }

}
) ();
