
var hosts = {
    media:  "//cdn.suayan.com",
    stream: "rtmp://stream.suayan.com",
    dev:    "http://dev.suayan.com",
    prod:   "http://node.suayan.com"
};

var urls = {
    facebookCallback:  "/auth/facebook/callback",
    googleCallback:    "/auth/google/callback",
    twitterCallback:   "/auth/twitter/callback",
    linkedinCallback:  "/auth/linkedin/callback",
    instagramCallback: "/auth/instagram/callback"
};

var port = 9000,
    portSuffix = ":" + port,
    host = hosts.dev + portSuffix;

if (process.env.NODE_ENV === "production") {
    host = hosts.prod;
    if (process.env.PORT) {
        port = process.env.PORT;
    }
}

var config = {
    mediaHost : hosts.media,
    streamHost : hosts.stream,
    socketHost : host,
    host : host,
    port : port,

    mongoURL : "mongodb://localhost/site",
    defaultLocale : "en_US",
    name : 'kyo suayan',
    author : 'Kyo Suayan',
    description : 'Design + Development',
    keywords : 'kyo, suayan, design, development, web',
    caching: false,
    expires: 0,

    facebook: {
        clientId :  process.env.FB_CLIENT_ID,
        secret : process.env.FB_SECRET,
        callbackURL : host + urls.facebookCallback
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : host + urls.googleCallback
    },
    linkedin: {
        consumerKey: process.env.LINKEDIN_CONSUMER_KEY,
        consumerSecret: process.env.LINKEDIN_CONSUMER_SECRET,
        callbackURL: host + urls.linkedinCallback
    },
    twitter: {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
        callbackURL: host + urls.twitterCallback
    },
    vimeo: {
        clientId: process.env.VIMEO_CLIENT_ID,
        clientSecret: process.env.VIMEO_CLIENT_SECRET,
        accessToken: process.env.VIMEO_ACCESS_TOKEN
    },
    flickr: {
        api_key: process.env.FLICKR_KEY,
        secret: process.env.FLICKR_USER_ID,
        user_id: process.env.FLICKR_SECRET,
        access_token: process.env.FLICKR_ACCESS_TOKEN,
        access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET,
        progress: false,
        silent: true,
        nobrowser: true
    },
    instagram: {
       client_id: process.env.INSTAGRAM_CLIENT_ID,
       client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
       callbackURL: host + urls.instagramCallback
    }
};

if (process.env.NODE_ENV === "production") {
    if (process.env.MONGOHQ_URL) {
        config.mongoURL = process.env.MONGOHQ_URL;
    }
    config.caching = true;
    config.expires = 60 * 60 * 24 * 4; // 4 days
}

console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log("CONFIG", config);

module.exports = config;
