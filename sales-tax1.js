var seneca = require('seneca')();

function resultObj (rate, net) {
  return {
   total:  net * (1 + rate  || 0)
 };
}

seneca.add({
    cmd:'salestax'
}, function(args, callback){
  var rate = 0.3;
  callback(null, resultObj(rate, args.net));
});

seneca.add({
  cmd: 'salestax',
  country: 'India'
}, function(args, callback) {
  var rate = 0.4;
  callback(null, resultObj(rate, args.net));
});

seneca.act({
  cmd: 'salestax',
  net: 100
}, function(err, result) {
   console.log( err, result);
});

seneca.act({
  cmd: 'salestax',
  net: 100,
  country: 'India'
}, function(err, result) {
   console.log( err, result);
});
