var groups = {
    "koken": {
        "hosts": {
            "visual": {
                "host": "visual.suayan.com",
                "port": 80,
                "username": "",
                "password": ""
            },
            "photos": {
                "host": "visual.suayan.com",
                "port": 80,
                "username": "",
                "password": ""
            },
            "img" : {
                "host": "img.suayan.com",
                "port": 80,
                "username": "",
                "password": ""
            }
        },
        "paths": {
            "albums":   "/api.php?/albums/listed:1/limit:50",
            "content":  "/api.php?/content/limit:50",
            "featured": "/api.php?/albums/featured/limit:50",
            "essays":   "/api.php?/text/type:essay/render:0"
        }
    }
};

module.exports = groups;
