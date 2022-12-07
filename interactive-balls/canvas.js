var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
};
window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});
window.addEventListener("resize", function() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
});

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;

  this.draw = function() {
    //c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < this.radius &&
      mouse.y - this.y < this.radius &&
      mouse.x - this.x > -this.radius &&
      mouse.y - this.y > -this.radius &&
      this.radius < 60
    ) {
      this.radius += 3;
    } else if (this.radius > this.minRadius) {
      this.radius -= 3;
    }

    this.draw();
  };
}

var circleArray = [];

function init() {
  circleArray = [];
  for (var i = 0; i < 700; i++) {
    var x = Math.random() * (innerWidth - 2 * radius) + radius;
    var y = Math.random() * (innerHeight - 2 * radius) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    var radius = Math.random() * 10 + 2;
    var circle = new Circle(x, y, dx, dy, radius);
    var colorArray = ["rgb(66, 95, 87)", "rgb(116, 159, 130)", "rgb(168, 232, 144)", "rgb(207, 255, 141)"]
    var color = colorArray[Math.floor(Math.random() * colorArray.length)];

    circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
}
init();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();
