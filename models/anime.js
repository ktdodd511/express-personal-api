var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var CharacterSchema = new Schema ({
  name: String
});


var animeSchema = new Schema ({
  name: String,
  image: String,
  dateReleased: String,
  stillOnAir: Boolean,
  // characters: [CharacterSchema]
});

var Anime = mongoose.model('Anime', animeSchema);
module.exports = Anime;
