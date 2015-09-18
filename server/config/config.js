var NODE_ENV = process.env.NODE_ENV;
var databaseName;

var options = {
  logging: false,
  user: 'root',
  password: ''
};

if (NODE_ENV === 'production') {
  databaseName = process.env.DATABASE_NAME;
  options = {
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
  };
} else if (NODE_ENV === 'test') {
  databaseName = 'schoolioTest';
} else {
  databaseName = 'schoolio';
}

module.exports.databaseName = databaseName;
module.exports.options = options;