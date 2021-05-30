const axios = require('axios');

const URL = 'https://www.codingame.com/services/ClashOfCode/createPrivateClash';
const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'Cookie': process.env.COOKIE, 'TE': 'Trailers' },
    data: "",
    url: URL,
};
const createPrivateClash = async (settingsJSON) => {
    let handler;
    options.data = settingsJSON;
    handler = await axios(options);
    return handler.data.publicHandle;
};

module.exports = createPrivateClash;
