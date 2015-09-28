# Schoolio

A tool for catering to different learning levels in a traditionally stagnant educational environment.  Built with Angular, Node/Express, MySQL, Twitter Bootstrap, Sass, Passport, and Gulp.

[Sign Up for Schoolio here!](https://schoolio.xyz/#/signup)

## Team

  - __Product Owner__: Jeff Plourd ([@jeffplourd](https://github.com/jeffplourd))
  - __Scrum Master__: Devon Koch ([@devonkoch](https://github.com/devonkoch))
  - __Lead Engineer__: Mychael Zuniga ([@MychaelZ](https://github.com/MychaelZ))
  - __Development Team__:
    - Adnan Pirzada ([@adpirz](https://github.com/adpirz))

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Feel free to run your instance of Schoolio! Our official deployment is [here](http://schoolio.xyz).

We'd love to see what you build on top of our app.

If you have any suggestions, please submit an [issue](https://github.com/CatatonicWonton/CatatonicWonton/issues).

## Requirements

- Angular 1.4.5
- Socket.IO 1.3.6
- Passport 0.3.0
- Node 0.12.x
- Express 4.13.x
- MySQL 2.9.0
- Sequelize 3.6.0
- Gulp 3.9.x

### Installing Dependencies

Initialize MySQL database:

```sh
mysql.server start
mysql -u root
CREATE DATABASE Schoolio;
```

From within the root directory:

```sh
npm install
gulp
```

### Running the app

The server uses port 8000 or the PORT environment variable.

From within the root directory:

```sh
npm start
```

### Roadmap

View the project roadmap [here](https://waffle.io/CatatonicWonton/CatatonicWonton/)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
