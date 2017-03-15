var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var data = [];
var calc = require('./util/priceCalculator.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-confirmation2'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/fonts/', express.static(__dirname, + '/node_modules/bootstrap/dist/fonts'));
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
    fs.readFile('public/data/data.json', 'utf8', function (err, data) {
        if (err) throw err; // we'll not consider error handling for now
        data = JSON.parse(data);
        var params = {};
        var orderCalc = new calc();
        params.crust = req.body.crust;
        params.size = req.body.size;
        params.topping = req.body.topping;
        params.quantity = req.body.number;
        params.customer = {};
        params.customer.tel = req.body.tel;
        params.customer.address = req.body.address;
        var cost = orderCalc.getCost(params.size, params.topping.split(',').length, params.quantity);
        params.cost = cost;
        params.time = orderCalc.getRandomTime(10, 30);
        var now = new Date();
        params.timestamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        res.render('order', {data: data, params: params});
    });

app.post('/confirm',(req, res) => {
   var order = JSON.stringify(req.body.order);
   var flag = false;
   fs.writeFile('public/export/order.json', order, 'utf8', function(err, data){
      if(err){
        throw err;
        res.send(JSON.stringify(flag));
      } else {
        flag = true;
        res.send(JSON.stringify(flag));
      }
   });
});


});


var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

});
