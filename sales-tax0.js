var seneca = require('seneca')();

seneca.add( {cmd:'salestax'}, function(args, callback){
  var rate = 0.3;
  var total = (1 + rate) * args.net;
  callback(null, {
     total:total
  });
});

seneca.act({
  cmd: 'salestax',
  net: 100
}, function(err, result) {
   console.log( err, result);
});
