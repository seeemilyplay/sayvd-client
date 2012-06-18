var connect = require('connect')
  , http = require('http');

var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.static('sayvd/client/core/www'))

var port = process.env.PORT || 8888;
http.createServer(app).listen(11220);