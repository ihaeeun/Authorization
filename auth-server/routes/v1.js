const express = require('express');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const router = express.Router();
const db = require('../config/config');
const crypto = require('crypto');
const passport = require('passport');
const bodyParser = require('body-parser');

router.post('/login', (req, res, next) => {
    // passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),(req, res, next) => {
    passport.authenticate('local', (authError, id, info) => {
        console.log(id);
        if(authError) {
            console.error(loginError);
            return next(loginError);
        }
        if(!id) {
            req.flash('loginError', info.message);
            return res.status(400).send("error");
        }
        return req.login(id, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).send("success");
        }) (req, res, next);
    });
    //     const user_id = req.body.id;
    //     const user_pw = req.body.password;
    //     const row = db.query('SELECT * FROM users WHERE id=?', user_id);
    //     const encryptPW = crypto.pbkdf2Sync(user_pw, row[0].salt, 2048, 64, 'sha512').toString('base64');
    
    //     db.query('SELECT * FROM users WHERE id=?', user_id, (err, result) => {
    //         if(err){
    //             console.log('err : ' + err);
    //         } else {
    //             if(result.length === 0) {
    //                 res.json({success: false, msg: '존재하지 않는 아이디입니다.'});
    //                 return done(false, null);
    //             } else if(encryptPW != result[0].password){
    //                 console.log('비밀번호가 일치하지 않습니다.');
    //                 // res.json({success: false, msg: ''})
    //                 return done(false, null);
    //             } else {
    //                 console.log('로그인 성공');
    //                 return done(null, {
    //                     user_id: result[0].user_id,
    //                 });
    //                 res.json({success: json});
    //             }
    //         }
    //     });
    // } 
    // res.redirect('main');
});

router.post('/join', (req, res, next) => {
    const user_id = req.body.id;
    const user_pw = req.body.password;
    const salt = crypto.randomBytes(16).toString('base64');
    const encryptPW = crypto.pbkdf2Sync(user_pw, salt, 2048, 64, 'sha512').toString('base64');

    db.query('INSERT INTO users(id, password, salt) VALUES (?, ?, ?)', [user_id, encryptPW, salt]), (req, res, next) => {
        if(err){
            console.log("error");
            console.log('err : ' + err);
        } else {
            // console.log("success");
            // console.log(res);
            // res.send("success");
            //res.json({success: json});
            res.status(200).end();
            
        }
    }
});

module.exports = router;