var json2csv = require('json2csv'),
    fs = require('fs'),

    geoColumns = ['name','address','city','state','zipcode','phone','latitude','longitude'];

var CsvApiHandler = function() {
    console.log("Initialized CSV API handler");
};

CsvApiHandler.prototype.saveJsonToCSV = function(request, response) {
    var jsonData = request.body.jsonData,
        filename = "uploads/" + request.body.filename,
        csvWriter = fs.createWriteStream(filename);
    json2csv({ data: jsonData, fields: geoColumns }, function(err, csv) {
        if (err) {
            response.send({status:"failed", error: err});
            return;
        }
        console.log("writing csv: ", filename, csv);
        csvWriter.write(csv);
        csvWriter.end();
        response.send({status:"ok"});
    });
};

module.exports = new CsvApiHandler();