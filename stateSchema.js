const mongoose = require('mongoose');
var settings = require('./settings');

var db_uri = settings.db.uri;

//mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect(db_uri)

var stateSchema =  mongoose.Schema({
	tittle : String,
	items : [{
            tittle : String,
	        description : String
    }]
});
var state = mongoose.model('state', stateSchema);
module.exports = state;