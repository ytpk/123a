const http = require('http');
const https = require('https');
const { parse } = require('url');

module.exports = (req, res) => {
  const { pathname, query } = parse(req.url, true);
  const options = {
    hostname: '94.228.165.52',
    port: 80,
    path: pathname,
    method: req.method,
    headers: req.headers
  };

  const proxy = https.request(options, function (targetRes) {
    res.writeHead(targetRes.statusCode, targetRes.headers);
    targetRes.pipe(res, {
      end: true
    });
  });

  req.pipe(proxy, {
    end: true
  });
};