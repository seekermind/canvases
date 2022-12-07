var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

/* window.addEventListener("resize", function() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
}); */







function animate(){
  requestAnimationFrame(animate)
  

}
animate()