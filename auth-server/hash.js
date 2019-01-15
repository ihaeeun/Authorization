// const bcrypt = require('bcrypt');
const crypto = require('crypto');

const user_pw = 'aaaa';
const salt = crypto.randomBytes(64).toString('base64');
const hash = crypto.pbkdf2Sync(user_pw, salt, 2048, 64, 'sha512').toString('base64');
console.log(salt);
console.log(hash);
console.log(typeof hash);

// crypto.randomBytes(64, (err, buf) => {
//     console.log(randomBytes());
//     crypto.pbkdf2(user_pw, buf.toString('base64'), 10000, 64, 'sha512', (err, key) => {
//         console.log(key.toString('base64'));
//     })
// })

// console.log(encryption);