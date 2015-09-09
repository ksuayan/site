"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    conf = require('./conf'),
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10,
    PASS_LENGTH = 4;

var FBProfileSchema = new Schema({
    fbId          : {type: String, default: ""},
    fbUsername    : {type: String, default: ""},
    fbProfileUrl  : {type: String, default: ""},
    fbEmails      : [{type: String, default: ""}],
    fbPhotos      : [{type: String, default: ""}]
});

var TwitterProfileSchema = new Schema({
    twId          : {type: String, default: ""},
    twName        : {type: String, default: ""},
    twScreenname  : {type: String, default: ""},
    twLocation    : {type: String, default: ""},
    twDescription : {type: String, default: ""},
    twUrl         : {type: String, default: ""},
    twLang        : {type: String, default: ""},
    twUtcOffset   : {type: String, default: ""},
    twTimezone    : {type: String, default: ""},
    twPhoto       : {type: String, default: ""}
});

var GoogleProfileSchema = new Schema({
    googleId      : {type: String, default: ""},
    googleEmail   : {type: String, default: ""},
    googleEmailVerified: {type: String, default: ""},
    googleName : {type: String, default: ""},
    googleGivenName: {type: String, default: ""},
    googleFamilyName: {type: String, default: ""},
    googleLink: {type: String, default: ""},
    googlePicture: {type: String, default: ""},
    googleGender: {type: String, default: ""},
    googleLocale: {type: String, default: ""}
});

var LinkedInProfileSchema = new Schema({
    id: {type: String, default: ""},
    liName: {type: String, default: ""},
    liFirstName: {type: String, default: ""},
    liLastName: {type: String, default: ""}
});


var UserSchema = new Schema({
    username      : {type: String, default: "", index: { unique: true }},
    displayName   : {type: String, default: ""},
    firstName     : {type: String, default: ""},
    middleName    : {type: String, default: ""},
    lastName      : {type: String, default: ""},
    email         : {type: String, default: ""},
    password      : {type: String, default: ""},

    status        : {type: String, default: "new"},
    locale        : {type: String, default: "en_US"},
    date          : {type: Date, default: Date.now},

    fbProfile      : [FBProfileSchema],
    googleProfile  : [GoogleProfileSchema],
    twitterProfile : [TwitterProfileSchema],
    linkedinProfile: [LinkedInProfileSchema]
});

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


var UserDB = function(){
    console.log("Initialized UserDB.");
    this.db = mongoose.createConnection(conf.mongoURL);
    this.UserModel = this.db.model('user', UserSchema);
};

UserDB.prototype.MapReduceProfileKey = function(parentAttribute, childAttribute) {
    var mapReduceQuery = {};
    // how variables can be passed in to your mapreduce query
    mapReduceQuery.scope = {
        parentAttribute: parentAttribute,
        childAttribute: childAttribute
    };
    mapReduceQuery.map = function() {
        if (childAttribute && this[parentAttribute][0] && this[parentAttribute][0][childAttribute]) {
            var listAttribute = this[parentAttribute][0][childAttribute];
            for (var i=0,n=listAttribute.length; i<n; i++) {
                var list = listAttribute[i].split(",");
                if (list.length) {
                    for (var j=0, k=list.length; j < k; j++) {
                        emit(list[j].trim(),1);
                    }
                } else {
                    emit(listAttribute[i].trim(), 1);
                }
            }
        }
    };
    mapReduceQuery.out = {replace:childAttribute};
    mapReduceQuery.reduce = function(previous, current) {
        var count = 0;
        for (var index in current) {//in this example, 'current' will only have 1 index and the 'value' is 1
            count += current[index];
        }
        return count;
    };
    this.UserModel.mapReduce(mapReduceQuery, function(err, results){
        if (err) {
            console.log("error", err);
        }
    });
};


UserDB.prototype.SaveProfile = function(req, res) {

    var successPath = 'content/success',
        errorPath = 'content/signup',
        messages = [],
        username = req.body.username,
        password = req.body.password,
        email = req.body.email,
        firstName = req.body.firstName,
        lastName = req.body.lastName;

    var onErrorCallback = function() {
        res.render(errorPath, { "user": req.user, "errors" : {"messages": messages}});
    };

    var updateUserDB = function() {
        var searchUserQuery = {"username": username};
        if (req.user && req.user._id) {
            searchUserQuery = {"_id": req.user._id};
        }
        userdb.UserModel.update(
            searchUserQuery,
            {$set: {
                username:  username,
                password:  password,
                email:     email,
                firstName: firstName,
                lastName:  lastName,
                status: "complete"
            }},
            {upsert: true},
            function(err){
                if (err) {
                    console.log("error on update:", err);
                    messages.push(err);
                    onErrorCallback();
                } else {
                    req.user.username = username;
                    req.user.status = "complete";
                    res.render(successPath);
                }
            });
    };

    var encryptPassword = function() {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) {
                return next(err);
            }
            // hash the password along with our new salt
            bcrypt.hash(password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                // override the cleartext password with the hashed one
                password = hash;
                updateUserDB();
            });
        });
    };

    if (!password) {
        messages.push("A password is required.");
    }

    if (password.trim().length < PASS_LENGTH) {
        messages.push("Password must have at least "+PASS_LENGTH+ " characters.");
    }

    if (password !== req.body.password2) {
        messages.push("Password and verified password must match.");
    }

    if (!username) {
        messages.push("Please provide your username.");
    }

    if (messages.length>0) {
        console.log("bunch of messages", messages);
        onErrorCallback();
    } else {
        userdb.IsUsernameAvailable(username, encryptPassword, onErrorCallback);
    }
};

UserDB.prototype.IsUsernameAvailable = function(username, onAvailableCallback, onErrorCallback) {
    userdb.UserModel
        .findOne({username: username}, function(err, found){
            if (err || found) {
                console.log("Username is taken: ", err, found);
                if (onErrorCallback && typeof onErrorCallback === 'function') {
                    onErrorCallback();
                }
            } else {
                console.log("Username is available: ", username);
                if (onAvailableCallback && typeof onAvailableCallback === 'function') {
                    onAvailableCallback();
                }
                return true;
            }
        });
};

UserDB.prototype.FindLocalUser = function(username, password, done) {
    userdb.UserModel.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                throw err;
            }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
};

var getListByKey = function(list, key) {
    var results = [];
    if (!list || !list.length || !key) {
        return results;
    }
    for (var i= 0, n=list.length; i<n; i++) {
        if (list[i][key]) {
            results.push(list[i][key]);
        }
    }
    return results;
};

var sanitizeProfile = function(profile) {
    var safeProfile = {
        _id: profile._id,
        lastName: profile.lastName || "",
        firstName: profile.firstName || "",
        middleName: profile.middleName || "",
        displayName: profile.displayName || "",
        username: profile.username || "",
        profile: (profile.profile[0]) ? profile.profile[0] : {}
    };
    return safeProfile;
};

UserDB.prototype.FindOrCreateFacebookUser = function(profile, done) {
    var that = this;

    console.log("FB Profile >>>>", profile);

    this.UserModel
        .findOne({"fbProfile.fbId" : profile.id})
        .exec(function(err, found){
            if (err) {
                return done(null, false, {message: err});
            }
            if (found) {
                return done(null, found);
            } else {
                var fbProfile = profile._json,
                    fbEmails = getListByKey(profile.emails,"value"),
                    fbPhotos = getListByKey(profile.photos,"value"),
                    newUser = new that.UserModel({
                        displayName: profile.displayName,
                        firstName: fbProfile.first_name,
                        middleName: (fbProfile.middle_name) ? fbProfile.middle_name : "",
                        lastName: fbProfile.last_name,
                        email: (fbEmails.length) ? fbEmails[0] : "",
                        locale: fbProfile.locale,
                        fbProfile: [{
                            fbId: profile.id,
                            fbEmails: fbEmails,
                            fbPhotos: fbPhotos,
                            fbUsername: profile.username,
                            fbProfileUrl: profile.profileUrl
                        }]
                    });
                newUser.save(function(err2){
                    if (err2) {
                        return done(null, false, {message: err2});
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
};

UserDB.prototype.FindOrCreateGoogleUser = function(profile, done) {
    var that = this;

    console.log("Google Profile >>>>", profile);

    this.UserModel
        .findOne({"googleProfile.googleId" : profile.id})
        .exec(function(err, found){
            if (err) {
                return done(null, false, {message: err});
            }
            if (found) {
                return done(null, found);
            } else {
                var gprof = profile._json;
                var googleProfile = {
                    googleId: gprof.id,
                    googleEmail: gprof.email,
                    googleEmailVerified: gprof.verified_email,
                    googleName : gprof.name,
                    googleGivenName: gprof.given_name,
                    googleFamilyName: gprof.family_name,
                    googleLink: gprof.link,
                    googlePicture: gprof.picture,
                    googleGender: gprof.gender,
                    googleLocale: gprof.locale
                };
                var newUser = new that.UserModel({
                    displayName: gprof.name,
                    firstName: gprof.given_name,
                    lastName: gprof.family_name,
                    locale: gprof.locale,
                    email: gprof.email,
                    googleProfile: [googleProfile]
                });

                newUser.save(function(err2){
                    if (err2) {
                        return done(null, false, {message: err2});
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
};

UserDB.prototype.FindOrCreateTwitterUser = function(profile, done) {
    var that = this;
    var twitter = profile._json;

    console.log("Twitter Profile >>>>", profile);

    this.UserModel
        .findOne({"twitterProfile.twId" : twitter.id})
        .exec(function(err, found){
            if (err) {
                return done(null, false, {message: err});
            }
            if (found) {
                return done(null, found);
            } else {

                var newUser = new that.UserModel({
                    displayName: twitter.name,
                    firstName: "",
                    lastName: "",
                    locale: twitter.lang,
                    twitterProfile: [{
                        twId: twitter.id,
                        twName: twitter.name,
                        twScreenname: twitter.screen_name,
                        twLocation: twitter.location,
                        twDescription: twitter.description,
                        twUrl: twitter.url,
                        twLang: twitter.lang,
                        twUtcOffset: twitter.utc_offset,
                        twTimezone: twitter.time_zone,
                        twPhoto: twitter.profile_image_url
                    }]
                });
                newUser.save(function(err2){
                    if (err2) {
                        return done(null, false, {message: err2});
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
};

UserDB.prototype.FindOrCreateLinkedInUser = function(profile, done) {
    var that = this;

    this.UserModel
        .findOne({"linkedinProfile.id" : profile.id})
        .exec(function(err, found){
            if (err) {
                return done(null, false, {message: err});
            }
            if (found) {
                return done(null, found);
            } else {
                var linkedinProfile = {
                    id: profile.id,
                    liName: profile.displayName,
                    liFirstName: profile.name.givenName,
                    liLastName: profile.name.familyName
                };
                var newUser = new that.UserModel({
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    locale: "en",
                    linkedinProfile: [linkedinProfile]
                });
                newUser.save(function(err2){
                    if (err2) {
                        return done(null, false, {message: err2});
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
};

// ===================
// API Endpoints
//

UserDB.prototype.getProfile = function(req, res) {
    if (!req.param.id && !(req.user && req.user._id)) {
        return res.json({message:"No user found"});
    }
    var userId = req.user._id || req.params.id;
    userdb.UserModel.findOne({ _id: userId}, function(err, profile) {
        if (err) { return res.send(err); }
        res.json(sanitizeProfile(profile));
    });
};

UserDB.prototype.updateProfile = function(req, res) {
    if (!req.param.id && !(req.user && req.user._id)) {
        return res.json({message:"No user found"});
    }
    var userId = req.user._id || req.params.id;
    var profileUpdate = req.body.profile;

    userdb.UserModel.findOne({ _id: userId }, function(err, profile) {
        if (err) {
            return res.send(err);
        }
        if (profile._id.toString() === userId.toString()) {
            userdb.UserModel.update(
                {"_id":userId},
                {$set: {
                    profile: [profileUpdate]
                }},
                {upsert: true},
                function(err){
                    if (err) {
                        res.json({message:"Update failed for "+userId});
                    } else {
                        res.json({message:"Update success."});
                    }
                });
        } else {
            res.json({message:'You are only allowed to edit your own profile.'});
        }
    });
};


var userdb = new UserDB();
module.exports = userdb;
