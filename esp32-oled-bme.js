/*
var wifi = require("Wifi");
wifi.connect("sauerkraut2", {password:"***REMOVED***"}, function(err){
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


function start(){
 // write some text
 g.drawString("Hello World!",2,2);
 // write to the screen
 g.flip(); 
}

// I2C
var g = require("SSD1306").connect(I2C1, start, {height:64});

/*
g.clear();
g.drawCircle(50, 40, 30);
g.flip();
*/

var bme = require("BME280").connect(I2C1);



var t=0;

function updateClockDisplay() {
  g.clear();
  g.drawString(t++, 2, 30);

  bme.readRawData();
  var temp_cal = bme.calibration_T(bme.temp_raw);
  var press_cal = bme.calibration_P(bme.pres_raw);
  var hum_cal = bme.calibration_H(bme.hum_raw);
  var temp_act = Math.round(temp_cal / 10.0)/10.0;
  var press_act = Math.round(press_cal / 100.0);
  var hum_act = Math.round(hum_cal / 102.40)/10.0;
  g.drawString("Temp: "+temp_act+" C", 0, 12);
  g.drawString("Pressure: "+press_act+" hPa", 0, 24);
  g.drawString("Humidity: "+hum_act+"%", 0, 36);

  g.flip();
}

setInterval(updateClockDisplay, 1000);

