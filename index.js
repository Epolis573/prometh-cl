const express = require('express')
const app = express()
const port = 8080

// Static
app.use(express.static(__dirname + "/public/"));

// Set Views
app.set('views', (__dirname + '/views'));
app.set('view engine', 'ejs');

// Routes
app.get('', (req, res) => {
    res.render('index');
});
app.get('/index', (req, res) => {
    res.render('index');
});
app.get('/news', (req, res) => {
    res.render('news');
});

// Listen
app.listen(port, () => console.info(`Listening on port ${port}`));