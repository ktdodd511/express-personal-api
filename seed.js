// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var db = require('./models');

var animeList= [
  {
  name: "One Piece",
  image: "onepieceimg.jpeg",
  dateReleased: "1999",
  stillOnAir: true,
  // characters: [CharacterSchema]
},

  {
  name: "HunterXHunter",
  image: "hunterxhunterimg.jpeg",
  dateReleased: "2011",
  stillOnAir: true,
  // characters: [CharacterSchema]
},

  {
  name: "Soul Eater",
  image: "onepieceimg.jpeg",
  dateReleased: "2008",
  stillOnAir: false,
  // characters: [CharacterSchema]
},

  {
  name: "Sword Art Online",
  image: "onepieceimg.jpeg",
  dateReleased: "2012",
  stillOnAir: false,
  // characters: [CharacterSchema]
},

  {
  name: "Deadman Wonderland",
  image: "onepieceimg.jpeg",
  dateReleased: "2011",
  stillOnAir: false,
  // characters: [CharacterSchema]
  }


]


animeList.forEach(function (data) {
  var anime = new db.Anime({
    name: data.name,
    image: data.image,
    dateReleased: data.dateReleased,
    stillOnAir: data.stillOnAir,

  });
  anime.save(function(err, savedAnime){
    if (err) {
      return console.log(err);
    }
    console.log('saved ' + savedAnime.name);
  });
});
