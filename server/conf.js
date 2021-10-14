var hosts = {
  media: 'http://cdn.suayan.com',
  stream: 'rtmp://stream.suayan.com',
  dev: 'http://dev.suayan.com',
  prod: 'http://node.suayan.com',
};

var urls = {
  facebookCallback: '/auth/facebook/callback',
  googleCallback: '/auth/google/callback',
  twitterCallback: '/auth/twitter/callback',
  linkedinCallback: '/auth/linkedin/callback',
  instagramCallback: '/auth/instagram/callback',
};

var port = 9000,
  portSuffix = ':' + port,
  host = hosts.dev + portSuffix;

if (process.env.NODE_ENV === 'production') {
  host = hosts.prod;
  if (process.env.PORT) {
    port = process.env.PORT;
  }
}

var config = {
  mediaHost: hosts.media,
  streamHost: hosts.stream,
  socketHost: host,
  host: host,
  port: port,

  version: 'WildRice v0.7 beta',
  defaultLocale: 'en_US',
  name: 'kyo suayan',
  author: 'Kyo Suayan',
  title: 'Kyo Suayan | Design + Development',
  description: 'Design + Development',
  keywords:
    'kyo,suayan,web,design,development,css3,html5,javascript,aem,cq5,ecmascript',
  defaultImage: hosts.media + '/dist/img/ks-logo.svg',
  defaultBanner: hosts.media + '/images/bay-bridge.jpg',
  defaultMastheadColor: '#333333',
  defaultMastheadStyle: 'color',
  gtmContainerId: 'GTM-T9K2TJX',

  socialEnabled: true,
  flickrEnabled: false,
  caching: false,
  touchOnUpdate: true,
  expires: 0,

  facebook: {
    clientId: process.env.FB_CLIENT_ID,
    secret: process.env.FB_SECRET,
    callbackURL: host + urls.facebookCallback,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: host + urls.googleCallback,
  },
  linkedin: {
    consumerKey: process.env.LINKEDIN_CONSUMER_KEY,
    consumerSecret: process.env.LINKEDIN_CONSUMER_SECRET,
    callbackURL: host + urls.linkedinCallback,
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
    callbackURL: host + urls.twitterCallback,
  },
  vimeo: {
    clientId: process.env.VIMEO_CLIENT_ID,
    clientSecret: process.env.VIMEO_CLIENT_SECRET,
    accessToken: process.env.VIMEO_ACCESS_TOKEN,
  },
  flickr: {
    api_key: process.env.FLICKR_KEY,
    secret: process.env.FLICKR_USER_ID,
    user_id: process.env.FLICKR_SECRET,
    access_token: process.env.FLICKR_ACCESS_TOKEN,
    access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET,
    progress: false,
    silent: true,
    nobrowser: true,
  },
  instagram: {
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: host + urls.instagramCallback,
  },
  mongoURL: process.env.MONGO_ATLAS_URL,
};

if (process.env.NODE_ENV === 'production') {
  config.caching = true;
  config.expires = 60 * 60 * 24 * 7; // 7 days
}

console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log("CONFIG", config);

module.exports = config;
