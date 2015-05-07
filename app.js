/// <reference path="typings/node/node.d.ts"/>
var http = require('http');
var request = require('request');
var express = require('express');
var util = require('util');
var _ = require("underscore");
var fs = require('fs');
var app = express();
//var moment = require('moment');
var moment = require('moment-timezone');
var url = 'https://api.forecast.io/forecast/e0c19772c4b3bfdf753d1cd0fd608282/41.9095,-87.6410';
var forecast;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var server = app.listen((process.env.PORT || 3000), function() {
    console.log('Listening on port %d', server.address().port);
});

app.get('/forecast', function(req, res) {

    request(url, function(error, response, data) {

        data = JSON.parse(data);

        forecast = {
            precip: data.currently.summary,
            time: moment().tz('America/Chicago').format("h:mmA"),
            temp: data.currently.apparentTemperature,
            lowTemp: data.daily.data[0].temperatureMin,
            highTemp: data.daily.data[0].temperatureMax,
            wind: data.currently.windSpeed,
            empty: ""
        }

        res.json(forecast);

        console.log('GOT FORECAST: ', forecast);
    });
});