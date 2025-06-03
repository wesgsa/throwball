const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const thetabar = document.getElementById("theta");
const Hbar = document.getElementById("H");
const v0bar = document.getElementById("v0");
const button = document.getElementById("btn");
const canvas_width = canvas.clientWidth;
const canvas_height = canvas.clientHeight;
canvas.width = canvas_width;
canvas.height = canvas_height;

let theta = 0;
let H = 60;
let v0 = 5;
let cx, cy, scalar0, vx, vy;
let ground_height, radius;
let fixed = true;

function init() {
    ground_height = Math.floor(canvas_height * 0.9);
    radius = 20;
    cx = radius * 1.4;
    cy = ground_height - H - radius;
    scalar0 = 5;
    vx = (v0 * scalar0 + 15) * Math.cos(theta);
    vy = (v0 * scalar0 + 15) * Math.sin(theta);
    button.innerText = "발사";
    fixed = true;
}


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, ground_height, canvas_width, Math.ceil(canvas_height * 0.1));

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + vx, cy - vy);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
}

function shootBall() {
    if (!fixed) {
        const dt = 0.2;
        cx += dt * vx / 2;
        cy -= dt * vy / 2;
        vy -= 100 * dt * dt;
        if (cy >= ground_height - radius) {
            cy = ground_height - radius+1e-5;
            if (Math.abs(vy) > 10) {
                vy *= -0.5;
                vx *= 0.8;
            }
            else {
                vx = 0;
                vy = 100 * dt * dt;
            }

        }
        if (cx > canvas.width - radius) {
            cx = canvas.width - radius;
            vx *= -0.4;
        }
        if (cx < radius) {
            cx = radius;
            vx *= -0.4;
        }
        if (cy < radius) {
            cy = radius;
            vy *= -0.2;
        }
        render();
    }

    requestAnimationFrame(shootBall);
}

thetabar.addEventListener('input', () => {
    theta = thetabar.value / 57.29;
    init();
    render();
});

Hbar.addEventListener('input', () => {
    H = Hbar.value;
    init();
    render();
});

v0bar.addEventListener('input', () => {
    v0 = v0bar.value;
    init();
    render();
});

button.addEventListener('click', () => {
    if (button.innerText == "발사") {
        button.innerText = "초기화";
        fixed = false;
    }
    else {
        init();
        render();
    }
});


init();
render();
shootBall();
