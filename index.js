
const domains = [
  'cyberspa.biz',
  'noisefloor.ca',
  'victorysquareblockparty.com',
  'bradwinter.ca',
 // 'imagesearch.marchienveen.com',
  'wurst.world'
];

const port = process.env.PORT || '8000';

const connect = require('connect'),
	serveStatic = require('serve-static'),
	vhost = require('vhost'),
 	_ = require('lodash');


var sites = {};

var app = connect();


_.each(domains, function(domain){
    console.log('serving ', domain);
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
