db.locations.createIndex({ loc: '2dsphere' });

db.locations.createIndex({
  name: 'text',
  address: 'text',
  description: 'text',
});

db.pages.createIndex({
  title: 'text',
  name: 'text',
  content: 'text',
  'content.content': 'text',
  keywords: 'text',
  description: 'text',
  excerpt: 'text',
});

db.stream.createIndex({
  body: 'text',
  title: 'text',
  description: 'text',
  'tags.name': 'text',
});

db.trackdbs.createIndex({
  Name: 'text',
  Artist: 'text',
  Album: 'text',
  Genre: 'text',
  Year: 'text',
});

// QUERY:
// db.pages.find({$text: {$search: "patio"}});
