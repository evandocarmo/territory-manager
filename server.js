// server.js
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
// Start the app by listening on the default
// Heroku port
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
//app.use(forceSSL());
app.use(express.static(__dirname + '/dist'));
app.get('*', function (req, res) {
  res.sendfile('./dist/index.html'); // load our index.html file
});
app.listen(process.env.PORT || 8080);
