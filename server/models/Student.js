module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    // username: {
    //   type: DataTypes.STRING,
    //   validate: {
    //     isUnique: function(value, next) {

    //     }
    //   }
    // },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  });
};

// email: {
//         type: Sequelize.STRING,
//         validate: {
//             isUnique: function(value, next) {

//                 UserModel.find({
//                     where: {email: value},
//                     attributes: ['id']
//                 })
//                     .done(function(error, user) {

//                         if (error)
//                             // Some unexpected error occured with the find method.
//                             return next(error);

//                         if (user)
//                             // We found a user with this email address.
//                             // Pass the error to the next method.
//                             return next('Email address already in use!');

//                         // If we got this far, the email address hasn't been used yet.
//                         // Call next with no arguments when validation is successful.
//                         next();

//                     });

//             }
//         }