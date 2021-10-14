'use strict';

var mongoClient = require('./mongo-client'),
  mongoose = mongoClient.mongoose,
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var TrackItem = new Schema({
  'Track ID': { type: Number },
  Name: { type: String },
  Artist: { type: String },
  Album: { type: String },
  Genre: { type: String },
  Kind: { type: String },
  Size: { type: Number },
  'Total Time': { type: Number },
  'Date Modified': { type: Date },
  'Date Added': { type: Date },
  'Bit Rate': { type: Number },
  'Sample Rate': { type: Number },
  Normalization: { type: Number },
  'Persistent ID': { type: String },
  'Track Type': { type: String },
  Location: { type: String },
});

var iTunesDB = function () {
  this.pagination = { skip: 0, pagination: 10 };
  this.fields = {
    _id: 1,
    Name: 1,
    Artist: 1,
    Album: 1,
    Genre: 1,
    'Total Time': 1,
  };
  this.TrackDbModel = mongoose.model('trackdbs', TrackItem);
  console.log('Initialized iTunesDB.');
};

iTunesDB.prototype.getTrack = function (request, response) {
  var result = { status: 'error' };
  if (typeof request.params.id !== 'undefined') {
    var query = { _id: request.params.id };
    itunesDB.TrackDbModel.find(
      query,
      {},
      itunesDB.pagination,
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          result = { status: 'ok', result: docs[0] };
        }
        response.send(result);
      }
    );
  }
};

iTunesDB.prototype.getTrackList = function (request, response) {
  var result = { status: 'error' };
  var query = { Genre: 'Alternative/Punk' };
  var fields = { Name: 1, Artist: 1, Genre: 1 };
  var allfields = {};
  itunesDB.TrackDbModel.find(
    query,
    allfields,
    itunesDB.pagination,
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        result = { status: 'ok', result: docs };
      }
      // console.log('found', docs.length);
      response.send(result);
    }
  );
};

iTunesDB.prototype.searchTerm = function (request, response) {
  var result = { status: 'error' };
  var term = request.params.term;
  if (!term) {
    term = 'summer';
  }
  if (term && typeof term !== 'undefined') {
    var re = new RegExp(term, 'i');
    var stream = itunesDB.TrackDbModel.find(
      {
        $or: [
          { Name: { $regex: re } },
          { Artist: { $regex: re } },
          { Album: { $regex: re } },
        ],
      },
      itunesDB.fields,
      itunesDB.pagination
    )
      .sort({ Artist: 1, Album: 1 })
      .exec(function (err, results) {
        if (err) {
          onError('searchTerm', err);
          return;
        }
        response.json({ status: 'ok', result: results });
      });
  }
};

iTunesDB.prototype.queryByAttribute = function (
  term,
  queryProfile,
  onDataSuccess,
  onError
) {
  if (term && queryProfile.attribute) {
    var query = {},
      stream = null,
      re = new RegExp(term, 'i'); // case insensitive
    query[queryProfile.attribute] = { $regex: re };
    try {
      stream = itunesDB.TrackDbModel.find(
        query,
        queryProfile.fields,
        itunesDB.pagination
      )
        .sort(queryProfile.sortOrder)
        .exec(function (err, results) {
          if (err) {
            onError('searchTerm', err);
            return;
          }
          onDataSuccess(queryProfile, results);
        });
    } catch (err) {
      onError(queryProfile.attribute, err);
    }
  }
};

iTunesDB.prototype.queryCollectionById = function (
  term,
  queryProfile,
  onDataSuccess,
  onError
) {
  if (term) {
    var docs = [],
      query = {},
      re = new RegExp(term, 'i'); // case insensitive

    query['_id'] = { $regex: re };
    // console.log("query collection by id:", query);
    var collection = mongoClient.db.collection(queryProfile.collection);
    try {
      collection
        .find(query)
        .sort(queryProfile.sortOrder)
        .toArray(function (err, docs) {
          if (err && onError && typeof onError === 'function') {
            onError(queryProfile.attribute, err);
            return;
          }
          onDataSuccess(queryProfile, docs);
        });
    } catch (err) {
      onError(queryProfile.attribute, err);
    }
  }
};

iTunesDB.prototype.searchMultiCriteria = function (request, response) {
  var result = { status: 'error' };
  var term = request.params.term;
  var sortOrder = { Artist: 1, Album: 1 };
  var resultObject = { keys: [], data: {} };
  var processed = 0; // implement this with timeouts.
  var queryProfiles = [
    // Search by Track Name
    {
      heading: 'Tracks',
      attribute: 'Name',
      fields: {
        _id: 1,
        Name: 1,
        Artist: 1,
        Album: 1,
        Genre: 1,
        'Total Time': 1,
      },
      sortOrder: { Name: 1, Genre: 1, Artist: 1, Album: 1 },
      type: 'find',
    },
    // Search by Distinct Artist Name
    {
      heading: 'Artist/Musician',
      attribute: 'Artist',
      collection: 'ByArtists',
      sortOrder: { _id: 1 },
      type: 'collectionById',
    },
    // Search by Distinct Album Name
    {
      heading: 'Album Name',
      attribute: 'Album',
      collection: 'ByAlbums',
      sortOrder: { _id: 1 },
      type: 'collectionById',
    },
  ];

  var total = 0;

  var onAllQueriesComplete = function () {
    resultObject.total = total;
    response.send(resultObject);
  };

  var onDataSuccess = function (queryProfile, data) {
    resultObject['keys'].push(queryProfile.attribute);
    resultObject['data'][queryProfile.attribute] = {
      heading: queryProfile.heading,
      type: queryProfile.type,
      count: data.length,
      tracks: data,
    };
    processed++;
    total = total + (data.length ? data.length : 0);
    if (processed === queryProfiles.length) {
      onAllQueriesComplete();
    }
  };

  var onError = function (attribute, error) {
    // console.log("Error on ", attribute, error);
    processed++;
    if (processed === queryProfiles.length) {
      onAllQueriesComplete();
    }
  };

  var multiQuery = function () {
    // console.log("term:", term);
    if (typeof term !== 'undefined') {
      for (var i = 0, n = queryProfiles.length; i < n; i++) {
        switch (queryProfiles[i]['type']) {
          case 'find':
            itunesDB.queryByAttribute(
              term,
              queryProfiles[i],
              onDataSuccess,
              onError
            );
            break;
          case 'collectionById':
            itunesDB.queryCollectionById(
              term,
              queryProfiles[i],
              onDataSuccess,
              onError
            );
            break;
          default:
            console.log('unknown query type:', queryProfiles[i]['type']);
        }
      }
    }
  };
  multiQuery();
};

var itunesDB = new iTunesDB();
module.exports = itunesDB;
