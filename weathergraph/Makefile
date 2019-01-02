# Simple Makefile

.PHONY:	upload default

default: upload
ifndef $(IP)
IP=192.168.21.120
endif

APP=app.js
SRC=src
MOD=modules
MODULES=$(MOD)/BME280.js $(MOD)/SSD1306.js $(MOD)/Font8x12.js
MYMODULES=$(SRC)/sparklines.js $(SRC)/circularBuffer.js
BUNDLE=dist/app-bundle.js

clean:
	-rm -f $(BUNDLE)
	-rm $(MODULES)

bundle: $(BUNDLE)

$(BUNDLE): $(SRC)/$(APP) $(MYMODULES) $(MODULES)
	npm run pack
	echo >>$(BUNDLE)

$(MOD)/%.js:
	curl http://www.espruino.com/$@ >$@

test:   $(SRC)/$(APP) $(MODULES)
	npm test

upload: $(BUNDLE)
	-dtr-toggle ; sleep 4
	nc -w 1 $(IP) 23 <$(BUNDLE)

