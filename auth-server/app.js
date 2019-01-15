const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
require('dotenv').config();

const apiRouter = require('./routes/v1');
const passportConfig = require('./passport');
// var usersRouter = require('./routes/users');

const app = express();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3001);

app.use(logger('dev'));
// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000*60*60
    },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/v1', apiRouter);
// app.use('/users', usersRouter);

app.listen(app.get('port'), () => {
    console.log('Express App on port', app.get('port'));
});

module.exports = app;
