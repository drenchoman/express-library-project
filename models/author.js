var mongoose = require('mongoose');

const {DateTime} = require('luxon');

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

AuthorSchema
  .virtual('lifespan')
  .get(function(){
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED): "";
  })

module.exports = mongoose.model('Author', AuthorSchema);
