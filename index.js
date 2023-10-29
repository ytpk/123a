const http = require('http');
const { parse } = require('url');

module.exports = (req, res) => {
  const { pathname } = parse(req.url);
  const options = {
    hostname: '94.228.165.52', // замените на ваш адрес сервера v2ray
    port: 80,
    path: pathname,
    method: req.method,
    headers: req.headers
  };

  const proxy = http.request(options, function (targetRes) {
    res.writeHead(targetRes.statusCode, targetRes.headers);
    targetRes.pipe(res, {
      end: true
    });
  });

  req.pipe(proxy, {
    end: true
  });
};