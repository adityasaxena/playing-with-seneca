var seneca = require('seneca')();

var rates = {
  'India' : 40
};

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
  prop: 'country' 
}, function(args, callback) {
  var rate = rates[args.country];
  callback(null, resultObj(rate, args.net));
});

seneca.act({
  cmd: 'salestax',
  net: 120
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
