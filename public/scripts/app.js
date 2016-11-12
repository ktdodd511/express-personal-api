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

});
