let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let mario = new Image();
let background = new Image();
let bitcoin = new Image();
mario.src = "images/mario-image.png";
background.src = "images/bitcoin-image.png";
bitcoin.src = "images/btc-image.png";


let xPosition = 80;
let yPosition = 80;
let score = 0;
let time = 0;
// File âm thanh
let soundtrack = new Audio();
let jump = new Audio();
let eatScore = new Audio();
soundtrack.src = "sounds/Chung-Ta-Khong-Thuoc-Ve-Nhau-Son-Tung-M-TP.mp3"
jump.src = "sounds/jump.mp3";
eatScore.src = "sounds/score.mp3";
// window.onload = function(){
//     soundtrack.loop();
//     soundtrack.play();
// }

// ấn key down - up
let jumpY = 30;
document.addEventListener("keydown",moveUp);
function moveUp(){
    yPosition = yPosition - jumpY;
    jump.play();

}
document.addEventListener("keyup", moveDown);
function moveDown() {
    yPosition = yPosition + jumpY;
    jump.play();
}
// Xuất hiện coin
let coinArr = [];
coinArr[0] = {
    x : canvas.width,
    y : 0
};
// Vẽ
function draw(){
    ctx.drawImage(background,0,0); // vẽ hình nền đầu tiên
    for(let i = 0; i < coinArr.length; i++){

        ctx.drawImage(bitcoin,coinArr[i].x,coinArr[i].y); // Vẽ đồng coin
        coinArr[i].x-=5;

        //tăng thêm coint
        if( coinArr[i].x == 240 ){
            coinArr.push({
                x : canvas.width,
                y : Math.floor(Math.random() * 60)
            }); 
        }
        let deleteArr = coinArr[i];

        // xóa coin nếu coin chạm mario?
        if(coinArr[i].x == 105 && coinArr[i].y+40 > yPosition){
            coinArr = coinArr.splice(i+1)
            score++;
            eatScore.play();
        }
    }


    // setInterval(time++, 1)
    soundtrack.play();
    if (time < 200 && score < 100){
        time+= 0.01;
        ctx.drawImage(mario,xPosition,yPosition); // vẽ mario
        ctx.fillStyle = "white";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : "+score + " Time: " + time.toFixed(0),10,canvas.height-5);
    } else {
        alert("GAME OVER" + " Score: " + score + " Time: " + time);
    }


    requestAnimationFrame(draw);
}

draw();






















