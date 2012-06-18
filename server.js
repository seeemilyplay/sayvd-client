var connect = require('connect')
  , http = require('http');

var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.static('sayvd/client/core/www'))

http.createServer(app).listen(11220);