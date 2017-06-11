const domains = [
  'cyberspa.biz',
  'noisefloor.ca',
  'victorysquareblockparty.com',
  'bradwinter.ca',
  'wurst.world'
];

const port = process.env.PORT || '8000';

const express = require('express'),
  connect = require('connect'),
  serveStatic = require('serve-static'),
  vhost = require('vhost'),
  _ = require('lodash'),
  fs = require('fs'),
  handlebars = require('handlebars');

const rootDomainRobotsTxt = fs.readFileSync(__dirname + '/root-domain-robots.txt').toString();
const rootDomainTemplate = fs.readFileSync(__dirname + '/root-domain-template.html').toString();

var sites = {};

var app = connect();

function track(req, res, next) {
  console.log(req.url);
  next();
};

_.each(domains, function (domain) {
  console.log('serving ', domain);
  sites[domain] = connect();
  sites[domain].use(serveStatic('./sites/' + domain));
  sites[domain].use(track);
  app.use(vhost(domain, sites[domain]));
  app.use(vhost('www.' + domain, sites[domain]));
//  if (port === '8000') {
  app.use('/' + domain, sites[domain]);
//  }
});


app.use('/robots.txt', function (req, res) {
  res.end(rootDomainRobotsTxt)
});

app.use('/', function (req, res) {
  const templateData = {
    rootDomain: _.get(req, 'headers.host'),
    domains:domains
  };
  console.log('get /', req.headers);
  const html = handlebars.compile(rootDomainTemplate)(templateData);
  res.setHeader('Content-Type','text/html; charset=UTF-8');
  res.end(html);
});


app.listen(port);
console.log('listening on ' + port);
