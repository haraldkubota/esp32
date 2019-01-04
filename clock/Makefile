# Simple Makefile

.PHONY:	default clean test upload

default: upload
ifndef IP
IP=192.168.21.180
endif

APP=app.js
SRC=src
MOD=modules
MODULES=$(MOD)/DS3231.js $(MOD)/SSD1306.js $(MOD)/Font8x12.js
BUNDLE=dist/app-bundle.js

clean:
	-rm -f $(BUNDLE)
	-rm -f $(MODULES)

distclean: clean
	-rm -f package-lock.json
	-rm -rf node_modules

$(BUNDLE): $(SRC)/$(APP) $(MODULES)
	npm run pack
	echo >>$(BUNDLE)

$(MOD)/%.js:
	curl http://www.espruino.com/$@ >$@

test:	$(SRC)/$(APP) $(MODULES)
	npm test

upload:	$(BUNDLE)
	#-dtr-toggle ; sleep 4
	echo -e "\nreset()\n\n" | nc -w 1 $(IP) 23 ; sleep 1
	nc -w 1 $(IP) 23 <$(BUNDLE)
	
