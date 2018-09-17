var YQL = require('yql');

var query = new YQL('select * from weather.forecast where (location = 94089)');

query.exec(function(err, data) {
  var location = data.query.results.channel.location;

  
  console.log('The current weather in ' + location + ', ' + location + ' is ');
});