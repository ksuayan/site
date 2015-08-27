var config = {
    host : "http://localhost",
    port : 9000,
    socketHost: "http://localhost:9000",
    mediaHost : "//cdn.suayan.com",
    mongoURL : "mongodb://localhost/site",
    defaultLocale : "en_US",
    name : 'Blooop Server',
    author : 'Kyo Suayan',
    description : 'Site Monitor',
    keywords : 'blooop, server',
    caching: false,
    expires: 0
};

if (process.env.NODE_ENV === "production") {
    config.port = process.env.PORT;
    config.mongoURL = process.env.MONGOHQ_URL;
    config.caching = true;
    config.expires = 60 * 60 * 24 * 4; // 4 days
}

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("config:", config);

module.exports = {
    app: config
};