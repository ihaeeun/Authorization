const express = require('expree')
const jwt = require('jsonwebtoken')

const { verifyToken } = require('./middlewares')
const { Domain, User, Post, Hashtag } = require('../models')

const router = express.Router();

router.post('/token', async(req, res) => {
    const { clientSecret } = req.body;
    try{
        const domain = await Domain.find({
            where: { clientSecret },
            include: {
                model: User,
                attribute: ['nick', 'id'],
            },
        });
        if(!domain){
            return res.status(401).json({
                code: 401,
                message: 'Not registered domain.',
            });
        }
        const token = jwt.sign({
            id: domain.user.id,
            nick: domain.user.nick,
        }, process.env.JWT_SECRET, {
            expiresIn: '1m',
            issuer: 'authorization',
        });
        return res.json({
            code: 200,
            message: 'A token is issued',
            token,
        });
    }catch(error){
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: 'Server Error',
        });
    }
});

router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded);
});

module.exports = router;