const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

app.set('view engine', 'hbs');
app.use((req, response, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log.');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    res.render('welcome.hbs', {
        currentYear: new Date().getFullYear(),
        welcomeText: 'Joł joł welcome in my new website'
    })
});

app.get('/about', (req, res, next) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
});


app.get('/bad', (req, res, next) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.listen('3000', () => {
    console.log('Server is running on port 3000');
});