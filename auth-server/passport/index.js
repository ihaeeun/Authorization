const local = require('./passport');
const db = require('../config/config');

module.exports = (passport) => {
    // 로그인 성공시 사용자 정보를 session에 저장
    passport.serializeUser((id, done) => {
        done(null, id);
    });

    // 인증 후, 페이지 접근 시마다 사용자 정보를 session에서 읽어옴
    passport.deserializeUser((id, done) => {
        done(null, id);
    });

    local(passport);
}