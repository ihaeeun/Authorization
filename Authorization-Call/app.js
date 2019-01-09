const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

const indexRouter = require('./routes')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('views engine', 'pug')
app.set('port', process.env.PORT || 3003)

app.use(morgan('dev'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
}))

app.use('/', indexRouter)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.render('error')
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번에서 대기중입니다')
})
