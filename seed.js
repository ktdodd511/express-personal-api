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
  image: "http://www.op-base.me/sites/all/themes/clean_theme/images/slide-image-1.jpg?1479060879463",
  // image: "/images/onepieceimg.jpeg",
  dateReleased: "1999",
  stillOnAir: true,
},

  {
  name: "HunterXHunter",
  image: "hunterxhunterimg.jpeg",
  dateReleased: "2011",
  stillOnAir: true,
},

  {
  name: "Soul Eater",
  image: "https://myanimelist.cdn-dena.com/s/common/uploaded_files/1444063749-240dd90d18e9f17827e8155e2c0a1f73.jpeg",
  dateReleased: "2008",
  stillOnAir: false,
},

  {
  name: "Sword Art Online",
  image: "http://cdn.slashgear.com/wp-content/uploads/2016/02/Sword-art-online-800x420.jpg",
  dateReleased: "2012",
  stillOnAir: false,
},

  {
  name: "Deadman Wonderland",
  image: "http://i.imgur.com/JU39yaE.png",
  dateReleased: "2011",
  stillOnAir: false,
  }


]

db.Anime.remove({}, function(err, Anime){
  console.log('removed all shows');
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

process.exit();

});
