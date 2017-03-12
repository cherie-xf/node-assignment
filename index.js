var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.set('view engine', 'ejs');

app.get('/',(req, res) =>{
    res.render('index', {title: "my test ejs"});
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