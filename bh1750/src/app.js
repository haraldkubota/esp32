/*
var wifi = require("Wifi");
wifi.connect("sauerkraut2", {password:"AntonAnton"}, function(err){
  console.log("connected? err=", err, "info=", wifi.getIP());
});
//wifi.stopAP();
wifi.save();
*/


function isDeviceOnBus(i2c,id) {
      try {
        return i2c.readFrom(id,1);
      }
      catch(err) {
        return -1;
      }
}
function detect(i2c,first, last) {
      first = first | 0;
      last = last | 0x77;
      var idsOnBus = Array();
      for (var id = first; id <= last; id++) {
        if ( isDeviceOnBus(i2c,id) != -1) {
          idsOnBus.push("0x"+id.toString(16));
        }
      }
      return idsOnBus;
}



I2C1.setup({sda: D5, scl: D4});

// console.log('I2C detect as array:',detect(I2C1));

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

