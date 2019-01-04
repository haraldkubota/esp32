
I2C1.setup({sda: D5, scl: D4});

var bh = require("../modules/BH1750").connect(I2C1, false);

function start(){
 // write some text
 g.drawString("Hello World!",2,2);
 // write to the screen
 g.flip(); 
}

//g.drawString("Hello World!",0,0);

var g = require("../modules/SSD1306").connect(I2C1, start, {height:64});
require("../modules/Font8x12").add(Graphics);
g.setFont8x12();

/*
g.clear();
g.drawCircle(50, 40, 30);
g.flip();
*/

function updateDisplay() {
  g.clear();
  bh.start(1, true);
  setTimeout(() => {
	  let lx=Math.round(bh.read()*10)/10;
    g.drawString("Lux: "+lx, 2, 30);
  	g.flip();
  }, 150); // sensor takes 120ms
}

setInterval(updateDisplay, 1000);

