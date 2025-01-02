const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

// تصویر هواپیما
const planeImg = new Image();
planeImg.src = "./img/plane.webp";

// موقعیت و اندازه‌ی هواپیما
let planeX = 50;
let planeY = canvas.height - 60 ;
const planeWidth = 60;
const planeHeight = 60;


planeImg.onload = () => {
    animate();
};


let bulletX = planeX+30  ;
let bulletY = planeY-30;
var bullets =[];

function animate(){
    requestAnimationFrame(animate);
    //جلوگیری از تکرار اشیا بازی در هنگام حرکت
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(planeImg, planeX, planeY, planeWidth, planeHeight);

    //شهاب سنگ
    ctx.fillStyle = "orange";
    ctx.fillRect(200, 100, 40, 40);

    //  تیر و حرکت آن
    ctx.fillStyle = "blue";
    for (let i = bullets.length - 1; i >= 0; i--) {
        let b = bullets[i];
        ctx.fillRect(b.x, b.y, b.width, b.height);
        
        
        b.y = b.y - 5;

        if (b.y + b.height < 0) {
            bullets.splice(i, 1);
        }
    }
}


function BulletThrow(){
    let bulletX = planeX+30  ;
    let bulletY = planeY-30;

    bullets.push({
        x : bulletX ,
        y : bulletY ,
        width : 2,
        height : 25 
    });
}





document.addEventListener("keydown", (event) => {
    const step = 10; // مقدار جابه‌جایی در هر بار فشردن کلید
    if(event.key=="ArrowLeft"){
        planeX = planeX - step;
    }else if(event.key=="ArrowRight"){
        planeX = planeX + step;
    }



    
    // جلوگیری از خروج از مرزهای چپ و راست
    if (planeX < 0) {
        planeX = 0;
    }
    
    
    console.log( canvas.width);

    
    if (planeX + planeWidth > canvas.width) {
        planeX = canvas.width - planeWidth;
    }
    console.log( planeX + planeWidth);


    if(event.key == "ArrowUp"){
        BulletThrow();
    }
    
});




