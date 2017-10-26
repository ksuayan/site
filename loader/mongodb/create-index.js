db.locations.createIndex({loc:"2dsphere"});

db.pages.createIndex({
    name:        "text",
    title:       "text",
    excerpt:     "text",
    content:     "text",
    "content.content": "text",
    description: "text",
    keywords:    "text"
});

// QUERY:
// db.pages.find({
//     $text: {$search: "patio"}
// });