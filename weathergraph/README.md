# weathergraph

This is a simple application to read out temperature, air pressure and relative humidity
and display on a small OLED with sparklines to show trending.

Tested on an ESP32 with OLED 128x64 pixel with SSD1306 controller.

## Test

This is an attempt to make the code modular and test the modules.
It's using [Jest](https://facebook.github.io/jest/) for testing

## Modules

While the Espruino environment is very nice for small programs, doing TDD is somewhere between hard or impossible
(or I just cannot make it work). The [espruino NPM module](https://www.npmjs.com/package/espruino) helps to get off the GUI,
but the Espruino module system does not work well for me.

So I tried to use [browserify](https://www.npmjs.com/package/browserify) and it worked well!
The only trouble point is that [Espruino](http://www.espruino.com/) does not understand all
the JavaScript code that [Node.js](https://nodejs.org/en/) understands, so while testing might be ok,
Espruino still complains. setter/getter don't work (Espruino v1.92).

### Path

Put your modules you load via require() into the modules/ directory.
If you use modules from Espruino, load them like this:

```bash
cd src/modules
wget https://www.espruino.com/modules/BME280.min.js
```
