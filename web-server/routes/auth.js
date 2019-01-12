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
                res.json(result);
            } else {
                res.json(err);
            }
        });
    });
    res.send();
});

module.exports = router;
