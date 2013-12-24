var config = {
    host : "http://localhost",
    port : 8000,
    mediaHost : "http://media.suayan.com",
    mongoURL : "mongodb://localhost/site",
    defaultLocale : "en_US",
    name : 'kyo suayan',
    author : 'Kyo Suayan',
    description : 'Design + Development',
    keywords : 'kyo, suayan, design, development, web',
    caching: false,
    expires: 0
};

if (process.env.NODE_ENV == "production") {
    config.port = process.env.PORT;
    config.mongoURL = process.env.MONGOHQ_URL;
    config.caching = true;
    config.expires = 60 * 60 * 24 * 4 // 4 days
};

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("config:", config);

module.exports = {
    app: config
};