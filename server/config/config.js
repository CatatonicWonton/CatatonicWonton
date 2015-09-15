var NODE_ENV = process.env.NODE_ENV;
var databaseUrl;

if (NODE_ENV === 'production') {
  databaseUrl = process.env.DATABASE_URL;
} else if (NODE_ENV === 'test') {
  databaseUrl = 'schoolioTest';
} else {
  databaseUrl = 'schoolio';
}

module.exports.databaseUrl = databaseUrl;