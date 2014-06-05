NPM_BIN=npm
BOWER_BIN=bower

.PHONY: all gulp bower bowerdeps npmdeps clean http-server serve

all: gulp bowerdeps npmdeps http-server

clean:
	rm -rf bower_components
	rm -rf node_modules
	$(NPM_BIN) uninstall -g bower
	$(NPM_BIN) uninstall -g gulp
	$(NPM_BIN) uninstall -g http-server

bower:
	$(NPM_BIN) install -g bower

gulp:
	$(NPM_BIN) install -g gulp

bowerdeps: bower
	$(BOWER_BIN) install

npmdeps:
	$(NPM_BIN) install

http-server:
	$(NPM_BIN) install -g http-server

serve:
	http-server dist/
