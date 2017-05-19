'use strict';
var PORT = 3000;
var fullPathToHomepageFile = __dirname + '/public/index.html';
var fullPathToRequestedArtistsFile = __dirname + '/requestedArtists.txt';
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.get('/', function (request, response) {
  console.log('HTTP GET ' + request.originalUrl + ' from ' + request.ip);
  response.sendFile(fullPathToHomepageFile);
});


app.get('/artist', function (request, response) {
  console.log('HTTP GET ' + request.originalUrl + ' from ' + request.ip);

  // fs.readFile(pathToFile, encodingOfFile, callback)
  fs.readFile(fullPathToRequestedArtistsFile, {encoding: 'utf-8'}, function(error, data) {
    if (!error) {
      var fileContentsInMarkupFormat = data.replace(/\n/g, '<br/>');
      console.log('Returning requested artists thus far.');
      response.send(fileContentsInMarkupFormat);
    } else {
      console.log('Error retrieving artists from file: ' + error);
      response.send('Error retrieving artists.');
    }
  });
});




app.delete('/artist',function(req,res){
     console.log('HTTP POST ' + request.originalUrl + ' from ' + request.ip);

fs.unlink(fullPathToRequestedArtistsFile, {encoding: 'utf-8'}, function(error, data) {
    
   if (!error) {

      console.log('Artists text file overwritten.');

    }else{
     
        console.log('Error overwritting artist file.');
          
      }
  });

     req.send(req.fullPathToRequestedArtistsFile.data);
});




// tell express to serve files in /public directory
app.use(express.static(__dirname + '/public'));
// tell express to insert html form values into the request.body property
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/artist', function (request, response) {
  console.log('HTTP POST ' + request.originalUrl + ' from ' + request.ip);
  var requestedArtist = request.body.artist;

  // fs.appendFile(pathToFile, dataToWriteToFile, callback)
  fs.appendFile(fullPathToRequestedArtistsFile, requestedArtist + '\n', function(error) {
    if (requestedArtist === "") {
      console.log('Error writing (' + requestedArtist + ') to file: ' + error);
      response.send('Error saving (' + requestedArtist + ').');
    } else {
      console.log('Artist (' + requestedArtist + ') saved to file: ' + fullPathToRequestedArtistsFile);
      response.send('You submitted: ' + requestedArtist);
    }
  });


});


app.listen(3000, '0.0.0.0', function() {
  console.log('Server listening for connections on port: ' + PORT);
});
