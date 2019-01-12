const express = require('express');
const router = express.Router();
const path = require('path');
// const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const crypto = require('crypto');

router.get('/', (req, res) => {
    res.render('login', { title: 'LOGIN' });
});

router.get('/join', (req, res) => {
    res.render('join', { title: 'JOIN' });
});

module.exports = router;
