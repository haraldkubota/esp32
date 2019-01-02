
I2C1.setup({sda: D5, scl: D4});

var rtc = require("../modules/DS3231").connect(I2C1);


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

function updateClockDisplay() {
  g.clear();
  g.drawString(rtc.readDateTime(), 2, 30);
  g.flip();
}

setInterval(updateClockDisplay, 1000);

