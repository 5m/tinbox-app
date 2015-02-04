"""
Start a rewriting HTTP server

Usage: server.py [options]

  -d, --directory=DIR   Directory to serve [default: ./]
  --host=HOST           Bind to host [default: 127.0.0.1]
  -p, --port=PORT       Listen on port [default: 5000]
  --debug               Debug mode
  -v                    Verbose
"""
import logging
import os
from flask import Flask, send_file, abort

_log = logging.getLogger()


def make_app(directory='.'):
    app = Flask(__name__)

    real_www = os.path.realpath(directory)

    @app.route('/')
    @app.route('/<path:path>')
    def serve_file_or_index(path=None):
        if path is not None:
            if '..' in path:
                _log.warn('The file %s was requested but contains "..", '
                          'aborting', path)
                abort(400)

            real_path = os.path.realpath(os.path.join(real_www, path))

            if real_www not in real_path:
                _log.warn('The file %s was requested, but it is outside of %s',
                          real_path, real_www)
                abort(403)

            if os.path.exists(real_path):
                _log.debug('Found file %s, serving', real_path)
                return send_file(real_path)

            _log.debug('Path %s requested but not found, returning '
                       'index.html', path)

        try:
            return send_file(os.path.join(real_www, 'index.html'))
        except FileNotFoundError:
            _log.exception('%s/index.html could not be found, you may have '
                           'forgotten about the --directory option', real_www)

    return app


def main():
    from docopt import docopt
    opts = docopt(__doc__, version='server v{}'.format('1.0'))

    logging.basicConfig(level=logging.DEBUG if opts['-v'] else logging.INFO)

    app = make_app(directory=opts.get('--directory'))
    app.run(host=opts['--host'],
            port=int(opts['--port']),
            debug=opts['--debug'])

if __name__ == '__main__':
    main()
