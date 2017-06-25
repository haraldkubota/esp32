# About this repository

Here contains samples for the [ESP32](https://en.wikipedia.org/wiki/ESP32) using [Espruino](https://www.espruino.com/)

## tools

* tools/dtr-toggle.c is what you think it is: it toggle DTR on /dev/ttyUSB0 or whatever the 1st argument is. This reboots reliably my [ESP32 module](https://www.aliexpress.com/item/Lolin-ESP32-wemos-ESP32-WiFi-Modules-Bluetooth-Dual-ESP-32-ESP-32S-ESP8266/32807483723.html)

## weathergraph

Read from a [BME280](https://www.bosch-sensortec.com/bst/products/all_products/bme280) and display with some graphics via [Sparklines](https://en.wikipedia.org/wiki/Sparkline) to show the trend
