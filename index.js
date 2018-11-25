
// 拖动红球
// 创建小球，小球的位置随机
// 小球不断的运动
// 判断是否碰撞

var DodgeBall = {
    redBall: document.getElementById('moveBall'),
    timeCount: document.getElementById('timeCount'),
    timeNum: 0,
    plus: {
        stage: document.getElementById('outer'),
        stageW: document.getElementById('outer').offsetWidth,
        stageH: document.getElementById('outer').offsetHeight,
        iSpeedX: 10,
        iSpeedY: 10
    },
    init: function () {
        this.createBall(this.plus);
        this.dragBall();
        this.timeRun();
    },
    timeRun: function (){
        var self = this;
        var timer = setInterval(function () {
            self.timeNum ++;
            self.timeCount.innerHTML = '已坚持' + self.timeNum + '秒';
        }, 1000)
    },
    createBall: function (obj) {
        var plus = obj;
        var self = this;
        function Ball(plus) {
            console.log(plus);
            this.greenBall = document.createElement('div');
            this.greenBall.className = 'ball';
            this.iCurrentW = Math.floor(Math.random() * plus.stageW);
            this.iSpeedX = Math.floor(Math.random() * plus.iSpeedX);
            this.iSpeedY = Math.floor(Math.random() * plus.iSpeedY);
            this.stageW = plus.stageW;
            this.stageH = plus.stageH;
            plus.stage.appendChild(this.greenBall);
        }
        for (var i = 0; i < 1; i++) {
            var ball = new Ball(plus);
            var current = ball.iCurrentW - ball.greenBall.offsetWidth;
            if (current < 0) {
                current = 0;
            }
            ball.greenBall.style.left = current + 'px';
            self.moveBall(ball);
        }
        var timer = setInterval(function () {
            var ball = new Ball(plus);
            var current = ball.iCurrentW - ball.greenBall.offsetWidth;
            if(current < 0) {
                current = 0;
            }
            ball.greenBall.style.left = current + 'px';
            self.moveBall(ball);
        }, 2000)


    },
    moveBall: function (ball) {
        var self = this;
        ball.timer = setInterval(function () {
            var newLeft = ball.iSpeedX + ball.greenBall.offsetLeft;
            var newTop = ball.iSpeedY + ball.greenBall.offsetTop;
            if (newLeft >= ball.stageW - ball.greenBall.offsetWidth) {
                ball.iSpeedX *= -1;
            }
            if (newLeft < 0) {
                ball.iSpeedX *= -1;
            }
            if (newTop >= ball.stageH - ball.greenBall.offsetHeight) {
                ball.iSpeedY *= -1;
            }
            if (newTop < 0) {
                ball.iSpeedY *= -1;
            }
            ball.greenBall.style.left = newLeft + 'px';
            ball.greenBall.style.top = newTop + 'px';
            self.crashCheck(ball, self.redBall);
        }, 50)
    },
    dragBall: function () {
        var self = this;
        self.redBall.onmousedown = function (e) {
            e = e || window.event;
            var on_x = e.pageX;
            var on_y = e.pageY;
            document.onmousemove = function (e) {
                e = e || window.event;
                var dis_x = e.pageX - on_x;
                var dis_y = e.pageY - on_y;
                self.redBall.style.left = self.redBall.offsetLeft + dis_x + 'px';
                self.redBall.style.top = self.redBall.offsetTop + dis_y + 'px';
                on_x = e.pageX;
                on_y = e.pageY;
                if (self.redBall.offsetLeft + self.redBall.offsetWidth > self.plus.stageW) {
                    alert('GAME OVER! 共坚持' + self.timeNum + '秒');
                    window.location.reload();
                }else if (self.redBall.offsetLeft < 0) {
                    alert('GAME OVER! 共坚持' + self.timeNum + '秒');
                    window.location.reload();
                }else if (self.redBall.offsetTop < 0) {
                    alert('GAME OVER! 共坚持' + self.timeNum + '秒');
                    window.location.reload();
                }else if (self.redBall.offsetTop + self.redBall.offsetHeight > self.plus.stageH) {
                    alert('GAME OVER! 共坚持' + self.timeNum + '秒');
                    window.location.reload();
                }

            }
            document.onmouseup = function () {
                document.onmousemove = null;
            }
        }
    },
    crashCheck: function (ball, redBall) {
        var ballX = ball.greenBall.offsetLeft + ball.greenBall.offsetWidth / 2;
        var ballY = ball.greenBall.offsetTop + ball.greenBall.offsetHeight / 2;
        var redBallX = redBall.offsetLeft + redBall.offsetWidth / 2;
        var redBallY = redBall.offsetTop + redBall.offsetHeight / 2;
        
        var disX = Math.abs(ballX - redBallX);
        var disY = Math.abs(ballY - redBallY);
        var dis = Math.floor(Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2)));
        if(dis <= (ball.greenBall.offsetWidth / 2 + redBall.offsetWidth / 2)) {
            alert('GAME OVER ! 共坚持' + this.timeNum + '秒');
            window.location.reload();
        }
    }
}
DodgeBall.init();