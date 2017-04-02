
var domains = [
  'cyberspa.biz',
  'noisefloor.ca',
  'bradwinter.local'
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
    app.use(vhost(domain, 'www.'+sites[domain]));
  })


app.listen(port);
console.log('listening on '+port);
