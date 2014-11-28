var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request = require('request');
var config = require('./config');

var port = process.env.PORT || config.port || 8080;

var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var search = require('./routes/search');

var User = require('./models/user');

var app = express();


passport.use(new OAuth2Strategy({
    authorizationURL: 'https://auth.sch.bme.hu/site/login',
    tokenURL: 'https://auth.sch.bme.hu/oauth2/token',
    clientID: '11302795928792584158',
    clientSecret: 'modXHTs7vs7uJl9XcJ8KcYJ0RaAeV618jTVqnEmZwjJ7KHUnRRytq8t9XtctpSqOmC6QGip3HzzS7J7O',
    callbackURL: "http://127.0.0.1:4567/auth"
  },
  function(accessToken, refreshToken, profile, done) {

    request.get('https://auth.sch.bme.hu/api/profile?access_token=' + accessToken,
      function(error, response, body) {
        if (error)
          console.error(error.message);

        var res = JSON.parse(body);
        console.log(res);

        var loginUser = new User({
          internal_id: res.internal_id,
          name: res.displayName,
          email: res.mail,
          sn: res.sn,
          given_name: res.givenName,
          room_number: res.roomNumber,
          basic: res.basic,
        });

        User.findOne({internal_id: loginUser.internal_id}, function(err, user) {
          if (err) {
            return console.error('Error: ', err);
          }

          console.log('User: ', user);

          if (!user) {
            console.log('User didn\'t found in database');

            loginUser.save( function(err, savedUser) {
              if (err) {
                return console.error('Error: ', err);
              }

              console.log('Saving user to database: ', savedUser);
              done(err, savedUser);
            });

          } else {
            console.log('User found in database');
            done(err, user);
          }
        });
    });
  }
));

var connect = function () {
  console.log('Connecting to MongoDB');
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.once('open', function() {
    console.log('Mongo working!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serialize user');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log('deserialize user');
    done(err, user);
  });
});

// routes
app.use('/', index);

app.get('/login', passport.authenticate('oauth2', {
  scope: ['basic', 'displayName', 'sn', 'givenName', 'mail', 'linkedAccounts', 'roomNumber']
}));

app.get('/auth', passport.authenticate('oauth2', {
  failureRedirect: '/failuer',
  successRedirect: '/book/lend'
}));

app.use('/profile', users.profile);
app.use('/user/:id', users.userById);
app.use('/books/new', books.addBook);
app.use('/books/:limit', books.list);
app.use('/book/lend', books.lend);
app.use('/book/:id', books.bookById);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, '0.0.0.0', function() {
    console.log('Application listen\'s on port: ' + port);
});