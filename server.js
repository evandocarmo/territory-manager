// server.js
const express = require('express');
const app = express();
const path = require('path');
// Run the app by serving the static files
// in the dist directory
// Start the app by listening on the default
// Heroku port
//app.use(forceSSL());
app.use(express.static(path.join(__dirname + '/dist') ,{ maxAge: 86400000 }));
app.get('*', function (req, res) {
  res.sendfile('./dist/index.html'); // load our index.html file
});
app.listen(process.env.PORT || 8080);
