var NODE_ENV = process.env.NODE_ENV;
var databaseName;

if (NODE_ENV === 'production') {
  databaseName = process.env.DATABASE_NAME;
} else if (NODE_ENV === 'test') {
  databaseName = 'schoolioTest';
} else {
  databaseName = 'schoolio';
}

module.exports.databaseName = databaseName;