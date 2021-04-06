// Require environment variables for local development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else {
    require('newrelic');
}

// Define required libraries.
const express = require('express'),
      request = require('request'),
      http = require('http'),
      path = require('path'),
      app = express();

// Configure environment variables.
const port = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.route('/proxy/:route')
    .get((req, res) => {
        request({
            url: process.env.API_PROXY_ROUTE + req.params.route,
        }).pipe(res);
    })
    .post((req, res) => {
        const options = { 
            url: process.env.API_PROXY_ROUTE + req.params.route,
            body: JSON.stringify(req.body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(options).pipe(res);
    });

// Route build files from client.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

http.createServer(app).listen(port, () => console.log(`Listening on port ${port}`));
