NPM_BIN=npm
BOWER_BIN=bower

.PHONY: all gulp bower bowerdeps npmdeps clean http-server serve

all: gulp bowerdeps npmdeps http-server

deps: bowerdeps npmdeps

clean:
	rm -rf bower_components
	rm -rf node_modules

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
	python server/server.py -d dist
