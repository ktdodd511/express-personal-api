console.log("Sanity Check: JS is working!");

var allAnime = [];

$(document).ready(function(){

var $animeList = $('#animeTarget');

// handlebars template
var source = $('#anime-template').html();
var template = Handlebars.compile(source);

$.ajax({
  method: 'GET',
  url: '/api/anime',
  success: handleSuccess,
  error: handleError
});

$('#newAnimeForm').on('submit', function(e) {
  e.preventDefault();
  console.log('new Anime created', $(this).serializeArray());
  $.ajax({
    method: 'POST',
    url: '/api/anime',
    data: $(this).serializeArray(),
    success: newAnimeSuccess,
    error: newAnimeError
  });
});

$animeList.on('click', '.deleteBtn', function() {
  console.log('clicked delete button to', '/api/anime/'+$(this).attr('data-id'));
  $.ajax({
    method: 'DELETE',
    url: '/api/anime/'+$(this).attr('data-id'),
    success: deleteAnimeSuccess,
    error: deleteAnimeError
  });
});

function render () {
  $animeList.empty();

  // pass 'allAnime' into the template function
  var animeHtml = template({ anime: allAnime });

  // append html to view
  $animeList.append(animeHtml);
}

function handleSuccess(json) {
  allAnime = json;
  render();
}

function handleError(err) {
  console.log('oh no!');
  $('#animeTarget').text('Failed to load anime shows.');
}


function newAnimeSuccess(json) {
  $('#newAnimeForm input').val('');
  allAnime.push(json);
  render();
}

function newAnimeError() {
  console.log('There was an error!');
}

function deleteAnimeSuccess(json) {
  var anime = json;
  console.log(json);
  var animeId = anime._id;
  console.log('delete anime', animeId);

  for(var i=0; i<allAnime.length; i++) {
    if(allAnime[i]._id === animeId) {
      allAnime.splice(i, 1);
      break;
    }
  }
  render();
}

function deleteAnimeError() {
  console.log('There was an error deleting a show!');
}

});
