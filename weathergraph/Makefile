# Simple Makefile

.PHONY:	upload default

default: upload

APP=app.js
SRC=src
MOD=$(SRC)/modules
MODULES=$(MOD)/sparklines.js $(MOD)/circularBuffer.js
TMP=/tmp/$(APP)

$(TMP):	$(SRC)/$(APP) $(MODULES)
	browserify $(SRC)/$(APP) >$(TMP)

test:	$(SRC)/$(APP) $(MODULES)
	npm test

upload:	$(TMP)
	dtr-toggle
	nc 192.168.21.115 23 <$(TMP)
