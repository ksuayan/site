db.locations.update(
  {map: "paris"},
  {
    $set: {
      map: "57342b06183b40ee11d6496f"
    }
  },
  {
    multi: true
  }
)


db.locations.update(
  {map: "venice"},
  {
    $set: {
      map: "573560a4183b40ee11d64972"
    }
  },
  {
    multi: true
  }
)

db.locations.update(
  {
    "address" : {
      $regex: /Italy/,
      $options: "i"
    }
  },
  {
    $set: {
      map: "573560a4183b40ee11d64972"
    }
  },
  {
    multi: true
  }
)

db.locations.update(
  {
    map: "",
    "address" : {
      $regex: /France/,
      $options: "i"
    }
  },
  {
    $set: {
      map: "57342b06183b40ee11d6496f"
    }
  },
  {
    multi: true
  }
)

db.locations.update(
  {
    map: "",
    "address" : {
      $regex: /Denmark/,
      $options: "i"
    }
  },
  {
    $set: {
      map: "57356372183b40ee11d64973"
    }
  },
  {
    multi: true
  }
)


Copenhagen: 57356372183b40ee11d64973
France: 57342b06183b40ee11d6496f

db.locations.update(
    {},
    {
      $set: {
        owner: "5635328ef6f188e206c46b7f"
      }
    },
    {
      multi: true
    }
)

db.locations.find({
  "address" : {
    $regex: /Italy/,
    $options: "i"
  }
})


var cursor = db.locations.find({
  "address" : {
    $regex: /France/,
    $options: "i"
  }
});
while (cursor.hasNext()) {
    var x = cursor.next();
    print("\n\n-----------------------------------");
    print("Before : address : "+x['address']);
    var url = x['address'].replace(/^(.*?)France(.*?)$/, '$2');
    var address = x['address'].replace(/^(.*?)France(.*?)$/, '$1') + "France";
    print("addr -> "+ address);
    if (!x.url && url) {
      print("url -> "+ url);
      db.locations.update({ _id : x._id }, { '$set': { 'url': url}});
    }
    db.locations.update({ _id : x._id }, { '$set': { 'address': address } } );
}



var cursor = db.locations.find({
  "address" : {
    $regex: /France/,
    $options: "i"
  }
});
while (cursor.hasNext()) {
    var x = cursor.next();
    var url = x['url'];
    if (url) {
      url = url.trim();
      print ("url: " + url);
      db.locations.update({ _id : x._id }, { '$set': { 'url': url}});
    }
}
