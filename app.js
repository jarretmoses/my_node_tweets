var express = require('express');
var url = require('url');
var request = require('request');
var auth = require('./config/auth');
var twit = require('twit');
var _ = require('underscore');
var app = express();

app.get('/', function(req,res){
  console.log('Got Request');
  res.sendFile(__dirname + '/public/index.html')
});

app.get('/tweets/:username',function(req,res){
  var username = req.params.username;
  T.get('statuses/user_timeline', { screen_name: username, count: 10}, 
    function(err, data, response) {
      var tweets = _.map(data,function(info){
        return info.text
      });
      res.locals = {tweets: tweets, name: username};
      res.render('tweets.ejs');
    });
});

var T = new twit({
    consumer_key:         auth.twitterAuth.consumerKey
  , consumer_secret:      auth.twitterAuth.consumerSecret
  , access_token:         auth.twitterAuth.accessToken
  , access_token_secret:  auth.twitterAuth.accessTokenSecret
})

app.listen(8080);
console.log("Listening on port 8080...");