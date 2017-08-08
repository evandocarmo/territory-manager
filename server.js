// server.js
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.get('*', function (req, res) {
  res.sendfile('./dist/index.html'); // load our index.html file
});
app.listen(process.env.PORT || 8080);
