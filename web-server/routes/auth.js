const express = require('express');
const router = express.Router();
const path = require('path');
// const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const request = require('request');
const API_Call = require('./callee');

router.post('/login', async (req, res, next) => {
    await request(options, (error, res, body) => {
        const user_id = req.body.id;
        const password = req.body.password;

        API_Call.login(user_id, password, function(err, ruselt){
            if(!error){
                res.json(result);
                res.render('main', { title: MAIN });
            } else {
                res.json(err);
            }
        });
    });
    res.send();
});


router.post('/join', async (req, res, next) => {
    await request(options, (error, res, body) => {
        const user_id = req.body.id;
        const password = req.body.password;

        API_Call.login(user_id, password, function(err, ruselt){
            if(!error){
                if(result == success){
                    res.send("회원가입에 성공하였습니다. 다시 로그인 해주세요.");
                    res.redirect('login', { title: 'LOGIN' });
                }
                else{
                    res.send("회원가입에 실패하였습니다.");
                    res.redirect('join', { title: 'JOIN' });
                }
            } else {
                res.json(err);
            }
        });
    });
});

module.exports = router;
