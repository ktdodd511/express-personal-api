// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/ktdodd511/express_self_api/README.md",
    baseUrl: "http://cryptic-lake-67320.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/anime", description: "Get all anime shows"},
      {method: "GET", path: "/api/anime/:id", description: "Get an anime show by id"},
      {method: "POST", path: "/api/anime", description: "Add more anime shows!"},
      {method: "DELETE", path:"/api/anime/:id", description: "Delete a show"}
    ]
  })
});

app.get('/api/profile', function profile(req, res) {
  res.json({
    name: "Katie",
    favoriteAnime: "HunterXHunter",
    location: "Oakland",
    hatesTrump: true

  });
});


// get all the anime shows
app.get('/api/anime', function(req, res) {
  db.Anime.find(function(err, anime) {
    if (err) {
      return console.log("index error: " + err);
    }
    res.json(anime);
  });
});


// get one show by id
app.get('/api/anime/:id', function(req, res) {
  db.Anime.findOne({
    _id: req.params._id
  }, function(err, data) {
    res.json(data);
  });
});


// create new anime show
app.post('/api/anime', function(req, res) {
  var anime = new db.Anime({
    name: req.body.name,
    image: req.body.image,
    dateReleased: req.body.dateReleased,
    stillOnAir: req.body.stillOnAir,
  });

  anime.save(function(err, anime) {
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", anime.name)
    res.json(anime);
  });
});


// delete a show
app.delete('/api/anime/:id', function(req, res) {
  console.log("anime delete", req.params);
  var animeId = req.params.id;
  db.Anime.findOneAndRemove({
    _id: animeId
  }, function(err, deletedAnime) {
    res.json(deletedAnime);
  });
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
