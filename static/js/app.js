var enemyAirport;
var canvas, context;
var fx, fy, nfx, nfy, i, destination, score, lifes, flag = true, src, src_t = "images/top_enemy.png";
var int_c, int_t, int_l, int_r, int_b, int_e, int_d, int_check;
var img = new Image();
var backgroundPositionY=0;
var scores = new Array();
var x = new Array();
var y = new Array();
x[0] = new Array();
y[0] = new Array();
x[1] = new Array();
y[1] = new Array();
x[2] = new Array();
y[2] = new Array();
x[3] = new Array();
y[3] = new Array();
var t = 0, time = 1;
window.onload = function () {
    $('#battlefield').hide();
    dragImage();
};

function createCanvas() {
    canvas = document.getElementById("battlefield");
    context = canvas.getContext('2d');
}

function dragImage() {
    enemyAirport = document.getElementById("enemyAirport");
    msgDiv = document.getElementById("msg");
    enemyAirport.ondragover = function (e) {
        e.preventDefault();
    };
    enemyAirport.ondrop = function (e) {
        e.preventDefault();
        var f = e.dataTransfer.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            enemyAirport.innerHTML = "<img src=\"" + fileReader.result + "\">";
            src_t = fileReader.result;
        };
        fileReader.readAsDataURL(f)
    }
}

function drawImage() {
    img.onload = function () {
        context.clearRect(fx, fy, 60, 60);
        context.drawImage(img, nfx, nfy, 60, 60);
        fx = nfx;
        fy = nfy;
    };
    img.src = src;
}

function createEnemy() {
    var img = new Image();
    var r = Math.round(Math.random() * 15) %15;
    var n = Math.round(Math.random() * 10) % 3;
    switch (n) {
        case 0:
            x[0][i] = r * 33;
            y[0][i] = 0;
            i++;
            clearInterval(int_t);
            moveEnemyT(time);
            break;
        case 1:
            x[1][i] = 0;
            y[1][i] = r * 21;
            i++;
            clearInterval(int_l);
            moveEnemyL(time);
            break;
        case 2:
            x[2][i] = 500;
            y[2][i] = r * 25;
            i++;
            clearInterval(int_r);
            moveEnemyR(time);
            break;
    }
   int_c = setTimeout(createEnemy, time * 1000);
}
function moveEnemyT(time) {
    int_t = setInterval(function () {
        var img = new Image();
        img.onload = function () {
            for (var j = 0; j < x[0].length; j++) {
                context.clearRect(x[0][j], y[0][j] - 1, 60, 60);
                context.drawImage(img, x[0][j], y[0][j]++, 60, 60);
            }
            for (var j = 0; j < x[0].length; j++) {
                if (y[0][j] >= 550) {
                    x[0].splice(j, 1);
                    y[0].splice(j, 1);
                }
            }
        };
        img.src = src_t;
    }, time*10)
}

function moveEnemyL(time) {
    int_l = setInterval(function () {
        var img = new Image();
        img.onload = function () {
            for (var j = 0; j < x[1].length; j++) {
                context.clearRect(x[1][j] - 1, y[1][j], 60, 25);
                context.drawImage(img, x[1][j]++, y[1][j], 60, 25);
            }
            if (x[1][j] >= 500) {
                x[1].splice(j, 1);
                y[1].splice(j, 1)
            }
        };
        img.src = "images/left_enemy.png";
    }, time*10);
}

function moveEnemyR(time) {
    int_r = setInterval(function () {
        var img = new Image();
        img.onload = function () {
            for (var j = 0; j < x[2].length; j++) {
                context.clearRect(x[2][j] + 1, y[2][j], 60, 25);
                context.drawImage(img, x[2][j]--, y[2][j], 60, 25);
            }
        };
        img.src = "images/right_enemy.png";
        for (var j = 0; j < x[2].length; j++) {
            if (x[2][j] <= -70) {
                x[2].splice(j, 1);
                y[2].splice(j, 1);
            }
        }
    }, time*10);
}

function moveBullet(){
    int_b = setInterval(function () {
        var img = new Image();
        img.onload = function () {
            for (var j = 0; j < x[3].length; j++) {
                context.clearRect(x[3][j], y[3][j] + 1, 30, 30);
                context.drawImage(img, x[3][j], y[3][j]--, 30, 30);
            }
        };
        img.src = "images/bullet.png";
        for (var j = 0; j < x[2].length; j++) {
            if (y[3][j] < -30) {
                x[3].splice(j, 1);
                y[3].splice(j, 1);
            }
        }
    }, 5);
}

function select(e) {
    var x = document.getElementsByClassName("fighting");
    if (x.length > 0) {
        x[0].className = "";
    }

    var  y = document.getElementsByClassName("selected");
    if (y.length > 0) {
        y[0].style.border = "solid 2px white";
        y[0].className = y[0].className.replace("selected", "");
    }
    str = e.className;
    e.className += " selected";
    e.style.border = "solid 2px red";
}

function status() {
        context.clearRect(0, 460, 110, 35);
        context.fillStyle = "white";
        context.fillText("score : "+score, 5, 470);
        context.fillText("lifes : "+lifes, 5, 480);
        context.fillText("destination : "+destination, 5, 490);
}

function start() {
    var fighter = document.getElementsByClassName("selected");
    if (fighter.length <= 0) {
        alert("Please select your fighter !");
    }else {
        $("#start").hide();
        $("#hint").hide();
        $("#perRank").hide();
        $("#rank").hide();
        $('#battlefield').show();
        createCanvas();
        document.getElementById('background').play();
    }
    fx = 210;
    fy = 440;
    nfx = 210;
    nfy = 440;
    i  = 0;
    destination = 100;
    score= 0;
    lifes = 5;
    src = fighter[0].src;
    setInterval(status, 10);
    int_e = setInterval(end,10);
    int_d = setInterval(function () {
        destination--;
    }, 1000);
    drawImage();
    createEnemy();
    int_check = setInterval(check, 5);
}


function shoot() {
    document.getElementById('shoot').play();
    x[3][i] = nfx + 15;
    y[3][i] = nfy - 35;
    moveBullet();
    i++;
}

function collision(x, y) {
    var img = new Image();
    img.onload = function () {
        context.drawImage(img, x, y, 60, 60);
        setTimeout(function () {
            context.clearRect(x, y, 60, 60);
        },200);
    };
    img.src = "images/explosion.png";
    window.setTimeout(drawImage,800);
}

function check() {
    var cx, cy;
    canvas.style.backgroundPositionY=backgroundPositionY+"px";
    backgroundPositionY+=0.15;
    if(destination < 30){
        time = 0.3;
    }else if(destination < 50){
        time = 0.5
    }else if(destination < 80){
        time = 0.8;
    }
    if(backgroundPositionY==512){
        backgroundPositionY=0;
    }
    for (var j = 0; j < x[0].length; j++) {
        if ((Math.abs(x[0][j] - nfx) < 65 && Math.abs(y[0][j] - nfy) < 50)) {
            document.getElementById('collision').play();
            context.clearRect(cx, cy, 60, 60);
            collision(nfx, nfy);
            cx = x[0][j];
            cy = y[0][j];
            y[0][j] = 500;
            context.clearRect(cx, cy, 60, 60);
            score++;
            lifes--;
        }
        for (var a = 0; a < x[3].length; a++) {
            if ((Math.abs(x[0][j] - x[3][a]) < 60 && Math.abs(y[0][j] - y[3][a]) < 50)) {
                document.getElementById('hit').play();
                collision(x[3][a], y[3][a]);
                cx = x[0][j];
                cy = y[0][j];
                y[0][j] = 500;
                context.clearRect(cx, cy, 60, 60);
                context.clearRect(x[3][a], y[3][a], 30, 30);
                y[3][a] = -30;
                score++;
            }
        }
    }

    for (var k = 0; k < x[1].length; k++) {
        if ((Math.abs(x[1][k] - nfx) < 55 && Math.abs(y[1][k] - nfy) < 50)) {
            document.getElementById('collision').play();
            collision(nfx, nfy);
            cx = x[1][k];
            cy = y[1][k];
            x[1][k] = 500;
            context.clearRect(cx-1, cy, 62, 25);
            score++;
            lifes--;
        }
        for (var b = 0; b < x[3].length; b++) {
            if ((Math.abs(x[1][k] - x[3][b]) < 45 && Math.abs(y[1][k] - y[3][b]) < 13)) {
                document.getElementById('hit').play();
                collision(x[3][b], y[3][b]);
                cx = x[1][k];
                cy = y[1][k];
                x[1][k] = 500;
                context.clearRect(cx-1, cy, 62, 25);
                context.clearRect(x[3][b], y[3][b], 30, 30);
                y[3][b] = -30;
                score++;
            }
        }
    }

    for (var l = 0; l < x[2].length; l++) {
        if ((Math.abs(x[2][l] - nfx) < 55 && Math.abs(y[2][l] - nfy) < 50)) {
            document.getElementById('collision').play();
            collision(nfx, nfy);
            cx = x[2][l];
            cy = y[2][l];
            x[2][l] = -100;
            context.clearRect(cx+1, cy, 62, 25);
            score++;
            lifes--;
        }
        for (var c = 0; c < x[3].length; c++) {
            if ((Math.abs(x[2][l] - x[3][c]) < 45 && Math.abs(y[2][l] - y[3][c]) < 13)) {
                document.getElementById('hit').play();
                collision(x[3][c], y[3][c]);
                cx = x[2][l];
                cy = y[2][l];
                x[2][l] = -100;
                context.clearRect(cx+1, cy, 62, 25);
                 context.clearRect(x[3][c], y[3][c], 30, 30);
                y[3][c] = -30;
                score++;
            }
        }
    }
}

function end() {
    if(lifes==0||destination==0){
        document.getElementById('background').pause();

        clearTimeout(int_c);
        clearInterval(int_t);
        clearInterval(int_l);
        clearInterval(int_r);
        clearInterval(int_b);
        clearInterval(int_d);
        clearInterval(int_e);
        clearInterval(int_check);
        $("#start").show();
        $("#hint").show();
        $("#perRank").show();
        $("#rank").show();

        score = score + lifes * 10;
        var username = prompt("You get "+ score +" point(s).please input your name.");
        
        localStorage.setItem(username,score);

        var record = {
            username : username,
            score : score
        }

        vm.create(record);

        context.clearRect(0, 460, 110, 30);
        var c = document.getElementById("battlefield");
        var ctx = c.getContext('2d');
        ctx.fillText("Game over, your score: "+score+"points", 20, 380);
        ctx.fillText("Please Press R button to restart game.", 20, 400);
    }
}

function RankList(id) {
    
    var recoreds = rank();
    
    var result = "<table class=\"table table-striped table-bordered table-hover\"><thead> <tr><th>#</th><th>Name</th><th>Score</th></tr> </thead>";
    for(var i= 0 ;i<10; i++){
        var key = recoreds[i].username;
        var value = recoreds[i].score;
        result += "<tbody><tr><td>"+(i+1)+"</td><td>"+key+"</td><td>"+value+"</td></tr></tbody>";
    }
    result += "</table>";
    var target = document.getElementById(id);
    target.innerHTML = result;
}


function handle() {
    switch (event.keyCode) {
        case 37:
            if (flag){
                nfx -= 10;
                nfx = nfx >= 0 ? nfx : 0;
                fx = nfx + 10;
                drawImage();
            }
            break;
        case 39:
            if (flag){
                nfx += 10;
                nfx = nfx >= 440 ? 440 : nfx;
                fx = nfx - 10;
                drawImage();
            }
            break;
        case 38:
            if (flag){
                nfy -= 10;
                nfy = nfy >= 0 ? nfy : 0;
                fy = nfy + 10;
                drawImage();
            }
            break;
        case 40:
            if (flag){
                nfy += 10;
                nfy = nfy >= 500 ? 500 : nfy;
                fy = nfy - 10;
                drawImage();
            }
            break;
        case 32:
            pause();
            break;
        case 65:
            if (flag){
                clearInterval(int_b);
                shoot();
            }
            break;
        case 82:
            restart();
            break;
    }
}

function restart() {
    for (var j = 0; j < x[0].length; j++) {
        var rx_t, ry_t;
        rx_t = x[0][j];
        ry_t = y[0][j];
        y[0][j] = 500;
        context.clearRect(rx_t, ry_t, 60, 60);
    }
    for (var k = 0; k < x[1].length; k++) {
        var rx_l, ry_l;
        rx_l = x[1][k];
        ry_l = y[1][k];
        x[1][k] = 500;
        context.clearRect(rx_l-1, ry_l, 62, 25);
    }
    for (var l = 0; l < x[2].length; l++) {
        var rx_r, ry_r;
        rx_r = x[2][l];
        ry_r = y[2][l];
        x[2][l] = -100;
        context.clearRect(rx_r+1, ry_r, 62, 25);
    }
    for (var m = 0; m < x[3].length; m++) {
        var rx_b, ry_b;
        rx_b = x[3][m];
        ry_b = y[3][m];
        y[3][m] = -20;
        context.clearRect(rx_b, ry_b, 48, 48);
    }
    context.clearRect(nfx, nfy, 60, 60);
    context.clearRect(20, 360, 250, 100);
    $("#start").hide();
    $("#hint").hide();
    $("#rank").hide();
    createCanvas();
    document.getElementById('background').play();
    fx = 210;
    fy = 440;
    nfx = 210;
    nfy = 440;
    i  = 0;
    destination = 100;
    score= 0;
    lifes = 5;
    drawImage();
    createEnemy();
    int_d = setInterval(function () {
        destination--;
    }, 1000);
    int_e = setInterval(end,10);
    int_check = setInterval(check, 5);
}

function pause() {
    if (flag){
        var img = new Image();
        img.onload = function () {
            context.drawImage(img, 200, 250, 60, 60);
        };
        img.src = "images/pause.png";
        document.getElementById('background').pause();
        $("#start").show();
        $("#hint").show();
        $("#perRank").show();
        $("#rank").show();
        clearTimeout(int_c);
        clearInterval(int_t);
        clearInterval(int_l);
        clearInterval(int_r);
        clearInterval(int_b);
        clearInterval(int_d);
        clearInterval(int_check);
    }else {
        $("#start").hide();
        $("#hint").hide();
        $("#perRank").hide();
        $("#rank").hide();
        document.getElementById('background').play();
        context.clearRect(200, 250, 60, 60);
        moveEnemyT();
        moveEnemyL();
        moveEnemyR();
        moveBullet();
        createEnemy();
        int_check = setInterval(check, 5);
        int_d = setInterval(function () {
            destination--;
        }, 1000);
    }
    flag = flag == true ? false : true;
}

function rank() {

    var records = [];

    for(var i= 0 ;i<localStorage.length; i++){
        var username = localStorage.key(i);
        var score = localStorage.getItem(username);

        var record = {
            username : username,
            score : score
        }
        records.push(record);
    }

    records.sort(function(a,b){return b.score-a.score});
    return records;
}