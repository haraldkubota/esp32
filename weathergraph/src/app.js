// ESP32 Espruino 1.92
// Read from BME280
// Display temp, humidity, air pressure
// Also display sparklines

const sparkLine = require('./sparklines.js')

const VERSION = "1.0"

I2C1.setup({sda: D5, scl: D4});

function splash(){
 g.drawString("Weather App v"+VERSION, 0, 0);
 g.flip(); 
}

const g = require("../modules/SSD1306.js").connect(I2C1, splash, {height:64});
require("../modules/Font8x12.js").add(Graphics);
g.setFont8x12();

const bme = require("../modules/BME280.js").connect(I2C1);


var updateCounter = 1;
var updateInterval = 1800;

var tSpark = sparkLine(64);
var pSpark = sparkLine(64);
var hSpark = sparkLine(64);
tSpark.minBottomToTop(2);
pSpark.minBottomToTop(10);
hSpark.minBottomToTop(5);

function displayGraph(x, y, data) {
  let i;
  for (i=0; i<data.length; ++i) {
    g.setPixel(x+i, y-data[i]);
  }
}

var t=0

function updateClockDisplay() {
  g.clear();
  g.drawString(t++, 0, 0);
  //g.drawString(rtc.readDateTime(), 0, 0);
  if (--updateCounter <=0 ) {
    updateCounter = updateInterval;
    bme.readRawData();
    temp_cal = bme.calibration_T(bme.temp_raw);
    press_cal = bme.calibration_P(bme.pres_raw);
    hum_cal = bme.calibration_H(bme.hum_raw);
    temp_act = Math.round(temp_cal / 10.0) / 10.0;
    press_act = Math.round(press_cal / 100.0);
    hum_act = Math.round(hum_cal / 102.40) / 10.0;
    tSpark.push(temp_act);
    pSpark.push(press_act);
    hSpark.push(hum_act);
  }
  g.drawString("T: " + temp_act + " C", 0, 14);
  g.drawString("P: " + press_act + " hPa", 0, 28);
  g.drawString("H: " + hum_act + "%", 0, 42);
  displayGraph(64, 14+12, tSpark.graph(12));
  displayGraph(64, 28+12, pSpark.graph(12));
  displayGraph(64, 42+12, hSpark.graph(12));
  g.flip();
}

//updateClockDisplay();
setInterval(updateClockDisplay, 1000);
