const canvas = document.querySelector('canvas');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const context = canvas.getContext('2d');
const circleArray = [];
function Circle(x, y, dx, dy, radius, g = 0, gSpeed = 0) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.grvityConstant = g;
    this.gravitySpeed = gSpeed;
    this.radius = radius;
    document.addEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickCoordinates);
}
Circle.prototype.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = 'green';
    context.stroke();
};
Circle.prototype.clickCoordinates = function(e) {
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].pointer(e);
    }
};
Circle.prototype.randomReset = function() {
    this.gravitySpeed = 0;
    this.grvityConstant = 0;
    this.dx = (Math.random() - 0.5) * 5;
    this.dy = (Math.random() - 0.5) * 5;
};
Circle.prototype.keyPress = function(e) {
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].keyEffect(e);
    }
};
// Circle.prototype.keyPress = function(event) {
//     for(let i = 0; i < circleArray.length; i++){
//         circleArray[i].gravity(event);
//     }
// };
Circle.prototype.gravity = function(e) {

};
Circle.prototype.pointer = function(e) {
    if(e.x - this.x > 0 && e.y - this.y > 0) {
        const sinAngel = (e.x - this.x) / Math.pow(Math.pow(e.x - this.x, 2) + Math.pow(e.y - this.y, 2), 0.5);
        this.dx = sinAngel;
        this.dy = Math.pow((1 - Math.pow(sinAngel,2)),0.5);
    }
    if(e.x - this.x > 0 && e.y - this.y < 0) {
        const sinAngel = (e.x - this.x) / Math.pow(Math.pow(e.x - this.x,2) + Math.pow(this.y - e.y,2), 0.5);
        this.dx = sinAngel;
        this.dy = -Math.pow((1 - Math.pow(sinAngel,2)),0.5);
    }
    if(e.x - this.x < 0 && e.y - this.y > 0) {
        const sinAngel = (this.x - e.x) / Math.pow(Math.pow(this.x - e.x,2) + Math.pow(e.y - this.y,2), 0.5);
        this.dx = -sinAngel;
        this.dy = Math.pow((1 - Math.pow(sinAngel,2)),0.5);
    }
    if(e.x - this.x < 0 && e.y - this.y < 0) {
        const sinAngel = (this.x - e.x) / Math.pow(Math.pow(this.x - e.x,2) + Math.pow(this.y - e.y,2), 0.5);
        this.dx = -sinAngel;
        this.dy = -Math.pow((1 - Math.pow(sinAngel,2)),0.5);
    }
    if(e.x - this.x === 0 && e.y - this.y === 0) {
        this.dx = 0;
        this.dy = 0;
    }
};
Circle.prototype.keyEffect = function(e) {
    // if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
    //     this.dx= -this.dx;
    // }
    // if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
    //     this.dx= -this.dx;
    // }
    if(e.keyCode === 40) {
        if (this.dx === 0) {
            this.dy++;
        } else {
            this.dx = 0;
            this.dy = 1;
        }
    }
    if(e.keyCode === 38) {
        if (this.dx === 0) {
            this.dy--;
        } else {
            this.dx = 0;
            this.dy = -1;
        }
    }
    if(e.keyCode === 39) {
        if (this.dy === 0) {
            this.dx++;
        } else {
            this.dx = 1;
            this.dy = 0;
        }
    }
    if(e.keyCode === 37) {
        if (this.dy === 0) {
            this.dx--;
        } else {
            this.dx = -1;
            this.dy = 0;
        }
    }
    if(e.keyCode === 32) {
        for(let i = 0; i < circleArray.length; i++){
            circleArray[i].randomReset();
        }
    }
    if (e.keyCode === 71) {
        this.dx = 0;
        this.dy = 0;
        this.grvityConstant = 0.004;
        // setInterval(() => {
        //     this.dy = this.dy + 2;
        //     clearInterval();
        // }, 1000);
    }
};
Circle.prototype.update = function() {
    this.gravitySpeed += this.grvityConstant;

    this.dy += this.gravitySpeed;

    if (this.x + this.radius > innerWidth && this.dx > 0 || this.x - this.radius < 0 && this.dx < 0) {
        this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight && this.y > 0 || this.y - this.radius < 0 && this.y < 0) {
        if ((Math.round(this.dy * 100) / 100) === (Math.round(this.gravitySpeed * 100) / 100)) {
            this.dy = 0;
            this.grvityConstant = 0;
        }
        this.gravitySpeed = 0;
        this.dy = this.dy > 0 ? -this.dy*0.8 : -this.dy;
    }
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    this.draw();
};
const prepareCanvas = () => {
    for(let i =0; i<200; i++){
        const radius = 30;
        const x = Math.random() * (innerWidth - 2 * radius) + radius;
        const y = Math.random() * (innerHeight - 2 * radius) + radius;
        const dx = (Math.random() - 0.5) * 5;
        const dy = (Math.random() - 0.5) * 5;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
const animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

const start = () => {
    prepareCanvas();
    animate();
}

start();
