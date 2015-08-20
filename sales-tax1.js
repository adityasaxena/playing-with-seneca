var seneca = require('seneca')();
var _ = require('lodash');

seneca.add({
    cmd: 'salestax'
}, function(args, callback) {
    var rate = args.rate === null ? 0 : args.rate;
    var total = args.net * (1 + rate);
    callback(null, {total: total});
});

function addCountry(country, callback) {
    return function(err, result) {
        callback(err, _.extend(result, {country: country}));
    }
}

seneca.add({
    cmd:'salestax',
    country: 'US'
}, function(args, callback){
    var rate = 0.5;
    seneca.act({
        cmd: 'salestax',
        rate: rate,
        net: args.net
    }, addCountry(args.country, callback));
});

seneca.add({
  cmd: 'salestax',
  country: 'India'
}, function(args, callback) {
    var rate = 0.4;
    seneca.act({
        cmd: 'salestax',
        rate: rate,
        net: args.net
    }, addCountry(args.country, callback));
});

seneca.act({
  cmd: 'salestax',
  net: 100,
  country: 'India'
}, function(err, result) {
   console.log( err, result);
});

seneca.act({
    cmd: 'salestax',
    net: 100,
    country: 'US'
}, function(err, result) {
    console.log( err, result);
});