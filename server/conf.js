var config = {
    host : "http://localhost",
    port : 9000,
    mediaHost : "http://media.suayan.com",
    mongoURL : "mongodb://localhost/site",
    defaultLocale : "en_US",
    name : 'kyo suayan',
    author : 'Kyo Suayan',
    description : 'Design + Development',
    keywords : 'kyo, suayan, design, development, web',
    caching: false,
    expires: 0,
    twitter: {
        "consumerKey": process.env['TWITTER_CONSUMER_KEY'],
        "consumerSecret": process.env['TWITTER_CONSUMER_SECRET'],
        "accessToken": process.env['TWITTER_ACCESS_TOKEN'],
        "accessTokenSecret": process.env['TWITTER_ACCESS_SECRET'],
        "callBackUrl": "http://dev.suayan.com:9000/auth/twitter/callback"
    },
    vimeo: {
        "clientId": process.env['VIMEO_CLIENT_ID'],
        "clientSecret": process.env['VIMEO_CLIENT_SECRET'],
        "accessToken": process.env['VIMEO_ACCESS_TOKEN']
    }
};

if (process.env.NODE_ENV === "production") {
    config.port = process.env.PORT;
    config.mongoURL = process.env.MONGOHQ_URL;
    config.caching = true;
    config.expires = 60 * 60 * 24 * 4; // 4 days
    config.twitter.callbackUrl = "http://node.suayan.com/auth/twitter/callback";
}

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("config:", config);

module.exports = {
    app: config
};
