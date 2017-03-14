var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var data = [];

app.use(bodyParser.urlencoded({extended: false}));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



app.get('/',(req, res) =>{
    fs.readFile('public/data/data.json', 'utf8', function (err, data) {
        if (err) throw err; // we'll not consider error handling for now
            data = JSON.parse(data);
            res.render('index', {data: data});
    });
});
app.post('/order',(req, res) =>{

    console.log();
    var a = parseInt(req.body.a);
    var b = parseInt(req.body.b);
    var sum = a+b;

    res.render('order', {a: a, b:b, sum: sum});

});


var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

});
