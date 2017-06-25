I2C1.setup({sda: D5, scl: D4});

function start(){
 // write some text
 g.drawString("Hello World!",20,40);
 // write to the screen
 g.flip(); 
}

var g = require("SSD1306").connect(I2C1, start, {height:64});
g.clear();
g.drawCircle(50, 40, 30);
g.flip();


require("Font8x12").add(Graphics);

// When drawing...
g.setFont8x12();
g.drawString("Hello World!",0,0);
g.flip();
