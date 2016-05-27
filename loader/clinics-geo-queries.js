/**
 MongoDB Query that finds physicians
 from a selected coordinate,
 with minDistance and maxDistance in miles.

 */

//
// Stanford Shopping Center
var lng = -122.17208697296144,
    lat = 37.44312551522633,
    minDistance = getMeters(2),
    maxDistance = getMeters(100);

var getMiles = function(i) {
   return i*0.000621371192;
};

var getMeters = function(i){
     return i*1609.344;
};

var distanceMeters = function(fromLng, fromLat, toLng, toLat) {
    var R = 6378137,
      dLat = (toLat-fromLat) * Math.PI / 180,
      dLng = (toLng-fromLng) * Math.PI / 180,
      a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(fromLat * Math.PI / 180 ) * Math.cos(toLat * Math.PI / 180 ) *
          Math.sin(dLng/2) * Math.sin(dLng/2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
      d = R * c;
      return Math.round(d);
};

db.doctors.find({
     "clinics.location": {
         $near : {
           $geometry: { type: "Point",  coordinates: [lng, lat] },
           $minDistance: minDistance,
           $maxDistance: maxDistance
          }
       }
    }
).forEach(function(doc) {
  var clinics = doc.clinics;

  print("\n==========");
  print(doc.title);
  print(doc.path+".html");
  print("----------");
  for (var i=0,n=clinics.length; i<n; i++) {
    var cLng = clinics[i].location.coordinates[0],
        cLat = clinics[i].location.coordinates[1],
        dist = distanceMeters(lng, lat, cLng, cLat);
      doc.clinics[i].miles = dist + " mi";
      print("dist: [" + getMiles(dist).toFixed(2) + " mi] " + clinics[i].address + ", " + clinics[i].city);
  }
});
