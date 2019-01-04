# About this repository

Here contains samples for the [ESP32](https://en.wikipedia.org/wiki/ESP32) using [Espruino](https://www.espruino.com/)
Here a picture of it:

## tools

* tools/dtr-toggle.c is what you think it is: it toggle DTR on /dev/ttyUSB0 or whatever the 1st argument is. This reboots reliably my ESP32 module.

## Samples for one of my ESP32 modules

![the ESP32 module I have](https://github.com/haraldkubota/esp32/blob/master/images/esp32-with-oled.jpg)


### weathergraph

Read from a [BME280](https://www.bosch-sensortec.com/bst/products/all_products/bme280) and display with some graphics via [Sparklines](https://en.wikipedia.org/wiki/Sparkline) to show the trend

### clock

Read from a DS3231 RTC and display the time on the OLED

### bh1750

Read from a BH1750 light sensor and display on the OLED

## Another ESP32 module: TTGO Eight

![the other ESP32 module I have](https://github.com/haraldkubota/esp32/blob/master/images/ttgo-eight.jpg)

## ttgo8-oled-circles

A slightly different ESP32 module (TTGO Eight) with a similar OLED with a different controller (SH1106 instead of SSD1306). Also I2C pins are different. Just drawing circles.

