const superagent = require('superagent');

const URL = 'https://www.codingame.com/services/ClashOfCode/startClashByHandle';

const startClashByHandle = (handle) => {
    superagent
        .post(URL)
        .send(handle) // sends a JSON post body
        .set('accept', 'json')
        .set('Cookie', process.env.COOKIE)
        .set('TE', 'Trailers')
        .end((err, res) => {
            if (err) console.log(err);
            else console.log(res);
        });
};

module.exports = startClashByHandle;
