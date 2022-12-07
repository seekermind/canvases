var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");
var gui = new dat.GUI()

const variables = {
  A:300,
  B:300,
  a:4,
  b:3,
  p:0.5
}

gui.add(variables,'A',50,500);
gui.add(variables,'B',50,500);
gui.add(variables,'a',1,20);
gui.add(variables,'b',1,20);
gui.add(variables,'p',Math.PI*0,Math.PI*2);


function animate(){
  requestAnimationFrame(animate)
  c.clearRect(0,0,canvas.width,canvas.height);
  c.beginPath();
  c.moveTo((canvas.width / 2) + variables.A * Math.sin( 1 * (Math.PI / 180 ) * variables.a), (canvas.height / 2) + variables.B * Math.sin( 1 * (Math.PI / 180 ) * variables.b+variables.p));
  for (let i = 1; i <= 10000; i++) {
    c.lineTo( (canvas.width / 2) + variables.A * Math.sin( i * (Math.PI / 180 ) * variables.a), (canvas.height / 2) + variables.B * Math.sin( i * (Math.PI / 180 ) * variables.b+variables.p,));
  }
  c.stroke();
}
animate()
