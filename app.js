/// <reference path="typings/node/node.d.ts"/>
var http = require('http');
var request = require('request');
var express = require('express');
var util = require('util');
var _ = require("underscore");
var fs = require('fs');
var app = express();
var moment = require('moment');
var url = 'https://api.forecast.io/forecast/e0c19772c4b3bfdf753d1cd0fd608282/41.9095,-87.6410';
var forecast;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});



function init() {
	
	checkWeather();

	setInterval(function () {
		checkWeather();
	}, 3600000)
}

function checkWeather() {
    
    request(url, function(error, response, data) {
        
        data = JSON.parse(data);

        forecast = {
            preceip: data.currently.summary,
            time: moment().format("H:mmA"),
            temp: data.currently.apparentTemperature,
            low: Math.round(data.daily.data[0].temperatureMin),
            high: Math.round(data.daily.data[0].temperatureMax)
        }

        console.log('GOT FORECAST: ', forecast);

    });
}

app.get('/forecast', function(req, res) {
   
    res.json(forecast);

});

init();
