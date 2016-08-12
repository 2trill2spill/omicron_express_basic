$(document).ready(function () {
  getSongs();

  // respond to submit event on form
  $('#song-form').on('submit', function () {
    event.preventDefault();

    var song = {}; // we will store our song here

    // iterate over form fields
    // populate our song object with title and artist
    $.each($('#song-form').serializeArray(), function (i, field) {
      song[field.name] = field.value;
    });

    // check that the data is getting submitted
    console.log('song submitted is ', song);

    $.ajax({
      type: 'POST',
      url: '/songs',
      data: song,
      success: function (response) {
        console.log('POST /songs works!');
        getSongs();
      },

      error: function (response) {
        //console.log('Attempted POST /songs, did not work');
        alert("Can not add song entered.");
      }
    });
  });

function getSongs() {
  $.ajax({
    type: 'GET',
    url: '/songs',
    success: function (songs) {
      $('#song-list').empty();
      songs.forEach(function (song) {
        $('#song-list').append('<div>' + song.dateAdded + ": " + song.title + '-' + song.artist + '</div>');
      });
    },

    error: function () {
      console.log('GET /songs did not work');
    },
  });
}
});
