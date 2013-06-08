module.exports = {
    app : {
        host : "http://localhost",
        port : process.env.PORT || 8000,
        mongoURL : process.env.MONGOHQ_URL || "mongodb://localhost/site",
        defaultLocale : "en_US",
        name : 'kyo suayan',
        author : 'Kyo Suayan',
        description : 'Design + Development',
        keywords : 'kyo, suayan, design, development, web'
    }
};
