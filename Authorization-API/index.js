const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.Hashtag = require('./hashtag')(sequelize, Sequelize)
db.Domain = require('../Authorization/api/models/domain')(sequelize, Sequelize)

db.User.hasMany(db.Post)
db.Post.belongsTo(db.User)
db.Post.belogsToMany(db.Hashtag, { through: 'PostHashtag' })
db.Hashtag.belogsToMany(db.Post, { through: 'PostHashtag' })
db.User.belongsToMany(db.User, {
    foreignKey: 'followerId',
    as: 'Follwers',
    through: 'Follow',
});
db.User.hasMany(db.Domain)
db.Domain.belongsTo(db.User)

module.exports = db;