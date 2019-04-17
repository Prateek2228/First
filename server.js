const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req,res,next) => {
    var now = new Date().toString();
    var time = 'Time is : '+now+' :'+req.method+' '+req.url;
    console.log(time);
    fs.appendFileSync('server.log', time);
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
    // res.send('<h1>Hello Welcome to express!</h1>');
    // res.send({
    //     name: 'Prateek',
    //     likes: ['Bikes', 'Cities']
    // })
    res.render('home.hbs', {
        pageHeading: 'Home Page',
        pageDescribe: 'Welcome to Home Page',
        author: 'Prateek"s'
    })
});

app.get('/about', (req,res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        pageHeading: 'About Page',
        author: 'Prateek"s'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});