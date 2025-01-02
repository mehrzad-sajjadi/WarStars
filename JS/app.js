const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let start = document.getElementById("start");
let refresh = document.getElementById("refresh");


let oilNum = document.getElementById("oil");

let limitOil = parseInt(oilNum.textContent);

let timeNum = document.getElementById("time");

let limitTime = parseInt(timeNum.textContent);

start.addEventListener("click", () => {
    animate();
    refresh.style.display = "inline";
    start.style.display = "none";

    //کاهش سوخت
    setInterval(() => {
        limitOil = limitOil - 1;
        if (limitOil == 0) {
            location.reload();
        }
        oilNum.textContent = limitOil;
    }, 1000);

    //زمان پیروزی
    setInterval(() => {
        limitTime = limitTime - 1;
        if (limitTime == 0) {
            location.reload();
            alert("تبریک میگم شما بردید !")
        }
        timeNum.textContent = limitTime;
    }, 1000);

});


refresh.addEventListener("click", () => {
    window.location.reload();
});


canvas.width = 800;
canvas.height = 500;

// تصویر هواپیما
const planeImg = new Image();
planeImg.src = "./img/plane.webp";

// موقعیت و اندازه‌ی هواپیما
let planeX = canvas.width / 2;
let planeY = canvas.height - 60;
let planeWidth = 60;
let planeHeight = 60;

let bullets = [];
let stons = [];
let oils = [];


setInterval(RainStone, 2000);
setInterval(RainOil, 5000);


function animate() {

    requestAnimationFrame(animate);

    //جلوگیری از تکرار شخصیتها بازی در هنگام حرکت
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // قرار دادن هواپیما در مختصات دلخواه
    ctx.drawImage(planeImg, planeX, planeY, planeWidth, planeHeight);


    //  تیر و حرکت آن
    ctx.fillStyle = "blue";
    for (let i = bullets.length - 1; i >= 0; i--) {
        var b = bullets[i];
        //دادن مختصات و اندازه تیر در هنگام شلیک
        ctx.fillRect(b.x, b.y, 2, 25);

        b.y = b.y - 5;

        if (b.y + b.height < 0) {
            bullets.splice(i, 1);
        }

        // بررسی برخورد با شهاب‌سنگ
        for (let j = stons.length - 1; j >= 0; j--) {
            let s = stons[j];
            // تشخیص برخورد
            if (
                (
                    b.x < s.x + 25 && b.x + 2 > s.x
                )
                &&
                (
                    b.y < s.y + 25 && b.y + 25 > s.y
                )
            ) {
                // حذف تیر و شهاب‌سنگ
                bullets.splice(i, 1);
                stons.splice(j, 1);
                break;
            }
        }

    }


    //شهاب سنگ باریدن
    ctx.fillStyle = "orange";
    for (let o = stons.length - 1; o > 0; o--) {
        var s = stons[o];
        ctx.fillRect(s.x, s.y, 25, 25);
        //سرعت پالیین اومدن شهاب
        s.y = s.y + 2;
    }


    //بارش سوخت
    ctx.fillStyle = "white";
    for (let t = oils.length - 1; t >= 0; t--) {
        var oil = oils[t];
        ctx.fillRect(oil.x, oil.y, 25, 25);
        //سرعت پالیین اومدن سوخت
        oil.y = oil.y + 2;
    }

    // تشخیص برخورد هواپیما یا شهاب
    for (let r = stons.length - 1; r >= 0; r--) {
        let s = stons[r];
        if (
            (
                planeX < s.x + 25 &&
                planeX + planeWidth > s.x
            )
            &&

            (planeY < s.y + 25 &&
                planeY + planeHeight > s.y)
        ) {
            location.reload();
            break;
            alert("متاسفانه پیروز نشدید !")

        }
    }




    // تشخیص برخورد هواپیما یا سوخت
    for (let k = oils.length - 1; k >= 0; k--) {
        let oil = oils[k];
        if (
            (
                planeX < oil.x + 25 &&
                planeX + planeWidth > oil.x
            )
            &&

            (planeY < oil.y + 25 &&
                planeY + planeHeight > oil.y)
        ) {
            oils.splice(k, 1);
            limitOil = limitOil + 10 ;
            oilNum.textContent = limitOil;

        }
    }

}

let bulletNum = document.getElementById("bullet");

//شلیک تیر
function BulletThrow() {
    let limitBullet = parseInt(bulletNum.textContent);

    if (limitBullet > 0) {
        let bulletX = planeX + 30;
        let bulletY = planeY - 30;

        bullets.push({
            x: bulletX,
            y: bulletY,
        });

        limitBullet = limitBullet - 1;

        bulletNum.textContent = limitBullet;
    }

}


function RainStone() {
    let stoneX = Math.floor(Math.random() * (canvas.width - 1));
    let stoneY = canvas.height - (canvas.height + 10);
    stons.push({
        x: stoneX,
        y: stoneY,
    });
}


function RainOil() {

    let oilX = Math.floor(Math.random() * (canvas.width - 1));
    let oilY = canvas.height - (canvas.height + 10);
    oils.push({
        x: oilX,
        y: oilY,
    });

}




document.addEventListener("keydown", (event) => {
    const step = 30; // گام های جابجایی
    if (event.key == "ArrowLeft") {
        planeX = planeX - step;
    } else if (event.key == "ArrowRight") {
        planeX = planeX + step;
    }

    // جلوگیری از خروج از مرزهای چپ
    if (planeX < 0) {
        planeX = 0;
        // مرز راست
    } else if (planeX + planeWidth > canvas.width) {
        planeX = canvas.width - planeWidth;
    }


    if (event.key == "ArrowUp") {
        BulletThrow();
    }
});
