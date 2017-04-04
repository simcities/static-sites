
var domains = [
  'cyberspa.biz',
  'noisefloor.ca',
  'victorysquareblockparty.com',
  'bradwinter.ca'
];

var port = process.env.PORT || '8000';

var connect = require('connect'),
	serveStatic = require('serve-static'),
	vhost = require('vhost'),
 	_ = require('lodash');


var sites = {};
_.each(domains, function(domain){
    sites[domain] = connect();
  })

var app = connect();

_.each(domains, function(domain){
    sites[domain] = connect();
    sites[domain].use(serveStatic('./sites/'+domain));
    app.use(vhost(domain, sites[domain]));
    app.use(vhost('www.'+domain, sites[domain]));
    if(port === '8000'){
      app.use('/'+domain, sites[domain]); 
    }
  })


app.listen(port);
console.log('listening on '+port);
