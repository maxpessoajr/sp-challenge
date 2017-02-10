var express = require('express'),
    path = require('path'),
    http = require('http');
var app = express();

//setup our app to use handlebars.js for templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.get('/', function(req, res) {
    var word = req.param('word');
    if (word!=undefined)
        word = word.replace(/[^a-z0-9+]+/gi, '');

    if (word==='' || word===undefined) {
        res.render('index');
        return;
    }

    var options = {
        host: 'localhost',
        port: '3001',
        path: '/palindrome/'+word,
        method: 'GET',
    };

    var httpreq = http.request(options, function (response) {
        response.on('data', function (val) {
            console.log(val);
        });
        response.on('end', function() {
            if (response.statusCode === 200)
                res.render('index',{strParam: 'Result: "' + req.param('word') + '" is a Palindrome.'});
            else {
                if (response.statusCode === 400)
                    res.render('index',{strParam: 'Result: "' + req.param('word') + '" is NOT a Palindrome.'});
                else
                    res.render('index',{strParam: "Error."});
            }
        })
    });
    httpreq.end();
});

app.listen(process.env.PORT || 8080);
console.log('App Running on port 8080.');