const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  response.setHeader('Access-Control-Allow-Origin', '*');
  return handler(request, response, {
    public: '.front/dist/'
  })
});

server.listen(3000, () => {
  console.log('Local server at http://127.0.0.1:3001');
});