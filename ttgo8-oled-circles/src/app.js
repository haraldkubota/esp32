// For TTGO Eight

I2C1.setup({
  sda: D21,
  scl: D22
});


function start() {
  // write some text
  g.drawString("Hello World!", 2, 2);
  // write to the screen
  g.flip();
}

//g.drawString("Hello World!",0,0);

var g = require("../modules/SH1106").connect(I2C1, start, {
  height: 64
});
require("../modules/Font8x12").add(Graphics);
g.setFont8x12();

/*
g.clear();
g.drawCircle(50, 40, 30);
g.flip();
*/
var size = 1
var increment = 1
var limit = 64

function updateDisplay() {
  g.clear();
  if (increment >= 0)
    g.drawCircle(64, 32, size);
  else
    g.fillCircle(64, 32, size)
  size += increment;
  if (size >= limit || size <= 1) {
    increment = -increment;
  }
  g.flip();
}

setInterval(updateDisplay, 1000);