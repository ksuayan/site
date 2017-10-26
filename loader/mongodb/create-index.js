db.locations.createIndex({loc:"2dsphere"});

db.locations.createIndex({
    name:            "text",
    address:         "text",
    description:     "text"
});

db.pages.createIndex({
    title:            "text",
    name:             "text",
    content:          "text",
    "content.content":"text",
    keywords:         "text",
    description:      "text",
    excerpt:          "text"
});

// QUERY:
// db.pages.find({$text: {$search: "patio"}});