var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");
var gui = new dat.GUI()
const wave = {
  y: canvas.height / 2,
  len: 0.01,
  ampl: 50,
  freq:0.01
}
const color = {
  h:0,
  s:50,
  l:50
}
const wavefolder = gui.addFolder('wave')
wavefolder.add(wave, 'y', 0, canvas.height)
wavefolder.add(wave, 'len', -0.05, 0.05)
wavefolder.add(wave, 'ampl', -300, 300)
wavefolder.add(wave, 'freq', -0.1, 0.1)
wavefolder.open()

const colorfolder = gui.addFolder('color')
colorfolder.add(color, 'h',0,255)
colorfolder.add(color, 's',0,50)
colorfolder.add(color, 'l',0,50)
colorfolder.open()

var df = wave.freq
var dc = 0
function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0,0,0,0.01)'
  c.fillRect(0,0,canvas.width, canvas.height)
  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(i, wave.y + Math.sin(i * wave.len+ df) * wave.ampl * Math.sin(df) );
  }
  c.strokeStyle = 'hsl('+ color.h + ',' + color.s + '%,' + color.l + '%)'
  c.stroke();
  df += wave.freq
}
animate()