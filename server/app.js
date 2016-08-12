var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var songs = []; //stores our songs

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));

function isEmpty(song) {
  if (song.title === "" || song.artist === "") {
    return true;
  }

  return false;
}

function isDuplicate(song) {
  var found = false;
  songs.forEach(function(singleSong) {
    if(song.title === singleSong.title && song.artist === singleSong.artist) {
      found = true;
      return;
    }
  });

  if(found == true) {
    return true;
  } else {
    return false;
  }
}

function addCurrentDate(song) {
  var currentTime = new Date();
  song.dateAdded = currentTime;
  return song;
}


/**
 * POST /songs
 *
 * Places song into songs array
 */
app.post('/songs', function(req, res) {
  var song = req.body;
  
  // Make sure the song title and artist strings are not empty.
  if(isEmpty(song) == true) {
    // Song is empty, so send back a failure response.
    res.sendStatus(400);
    return;
  }

  // Make sure the song is not a duplicate of a song already added.
  if(isDuplicate(song) == true) {
    // The song is a duplicate, so send back a failure response.
    console.log("Duplicate");
    res.sendStatus(400);
    return;
  }

  console.log("Not duplicate");

  // Add current date to the song object.
  song = addCurrentDate(song);

  // Push the song object to the song array.
  songs.push(song);
  res.sendStatus(201);
});

app.get('/songs', function (req, res) {
  res.send(songs);
});

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function () {
  console.log('Server now running at port ', app.get('port'));
});
