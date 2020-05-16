require('dotenv').config();

const PORT = process.env.PORT || 3000;
module.exports.PORT = PORT;
const dbURI = 'mongodb://localhost:27017/mestodb';
module.exports.dbURI = dbURI;
