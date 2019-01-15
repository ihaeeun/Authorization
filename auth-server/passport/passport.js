const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/config');
// const connection = db.init();
// db.test_open(connection);
const bcrypt = require('bcrypt');

// 로그인 유저 판단 로직
// exports.isAuthenticated = (req, res, next) => {
//     if(req.isAuthenticated()){
//         return next();
//     } res.redirect('/login');
// }



module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
        // passReqToCallback: true
    }, async (id, password, done) => {
        try{
            const exUser = await db.query('SELECT * FROM users WHERE id=?', user_id, (err, result));
            if(exUser) {
                const encryptPW = crypto.pbkdf2Sync(password, exUser[0].salt, 2048, 64, 'sha512').toString('base64');
                const result = (encryptPW) => {
                    if(encryptPW === exUser[0].password) { return true; }
                    else { return false; }
                };
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다. '});
                }
            } else {
                return done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch(error) {
            console.error(error);
            done(errror);
        }
    }));
}