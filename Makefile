default:
	@echo "Only use this to simply run a distclean on all directories"

SUBDIRS := $(wildcard */.)

distclean: $(SUBDIRS)
$(SUBDIRS):
	$(MAKE) distclean -C $@

.PHONY: all $(SUBDIRS)


