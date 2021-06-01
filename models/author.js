var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: {type: String, required: true, maxLength: 100},
  family_name: {type: String, required: true, maxLength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
});

// Virtuals

AuthorSchema
.virtual('name')
.get(function () {
  return this.first_name + ', ' + this.family_name;
});

// Lifespan

AuthorSchema
.virtual('Lifespan')
.get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

AuthorSchema
.virtual('url')
.get(function (){
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);
