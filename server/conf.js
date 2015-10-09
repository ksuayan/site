var config = {
    host : "http://dev.suayan.com:9000",
    port : 9000,
    mediaHost : "//cdn.suayan.com",
    streamHost : "rtmp://stream.suayan.com",
    socketHost : "http://dev.suayan.com:9000",
    mongoURL : "mongodb://localhost/site",
    defaultLocale : "en_US",
    name : 'kyo suayan',
    author : 'Kyo Suayan',
    description : 'Design + Development',
    keywords : 'kyo, suayan, design, development, web',
    caching: false,
    expires: 0,

    facebook: {
        clientId :  process.env['FB_CLIENT_ID'],
        secret : process.env['FB_SECRET'],
        callbackURL : "http://dev.suayan.com:9000/auth/facebook/callback"
    },
    google: {
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL : "http://dev.suayan.com:9000/auth/google/callback"
    },
    linkedin: {
        consumerKey: process.env['LINKEDIN_CONSUMER_KEY'],
        consumerSecret: process.env['LINKEDIN_CONSUMER_SECRET'],
        callbackURL: "http://dev.suayan.com:9000/auth/linkedin/callback"
    },
    twitter: {
        consumerKey: process.env['TWITTER_CONSUMER_KEY'],
        consumerSecret: process.env['TWITTER_CONSUMER_SECRET'],
        accessToken: process.env['TWITTER_ACCESS_TOKEN'],
        accessTokenSecret: process.env['TWITTER_ACCESS_SECRET'],
        callbackURL: "http://dev.suayan.com:9000/auth/twitter/callback"
    },
    vimeo: {
        clientId: process.env['VIMEO_CLIENT_ID'],
        clientSecret: process.env['VIMEO_CLIENT_SECRET'],
        accessToken: process.env['VIMEO_ACCESS_TOKEN']
    },
    flickr: {
        api_key: process.env['FLICKR_KEY'],
        secret: process.env['FLICKR_USER_ID'],
        user_id: process.env['FLICKR_SECRET'],
        access_token: process.env['FLICKR_ACCESS_TOKEN'],
        access_token_secret: process.env['FLICKR_ACCESS_TOKEN_SECRET'],
        progress: false,
        silent: true,
        nobrowser: true
    },
    instagram: {
       client_id: process.env['INSTAGRAM_CLIENT_ID'],
       client_secret: process.env['INSTAGRAM_CLIENT_SECRET'],
       callbackURL: "http://dev.suayan.com:9000/auth/instagram/callback"
    }


};

if (process.env.NODE_ENV === "production") {
    if (process.env.PORT) {
        config.port = process.env.PORT;
    }
    if (process.env.MONGOHQ_URL) {
        config.mongoURL = process.env.MONGOHQ_URL;
    }
    config.caching = true;
    config.expires = 60 * 60 * 24 * 4; // 4 days
    config.socketHost = "http://node.suayan.com";
    config.facebook.callbackURL= "http://node.suayan.com/auth/facebook/callback";
    config.google.callbackURL= "http://node.suayan.com/auth/google/callback";
    config.twitter.callbackUrl= "http://node.suayan.com/auth/twitter/callback";
    config.linkedin.callbackURL= "http://node.suayan.com/auth/linkedin/callback";
    config.twitter.callbackUrl = "http://node.suayan.com/auth/twitter/callback";
    config.instagram.callbackURL= "http://node.suayan.com/auth/instagram/callback";
}

console.log("NODE_ENV:", process.env.NODE_ENV);

module.exports = config;
