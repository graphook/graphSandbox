var fs = require('fs');
var N3 = require('n3');
var csv2rdf = require('gtfs-csv2rdf').zipToTriples;
var path = "../data/";
if (/(.*\/)?(.*?)\.zip/.exec(path)) {
  var feedname = /(.*\/)?(.*?)\.zip/.exec(path)[2];
} else {
  throw "Not a zip file: " + path;
}
//create the writer of turtle file towards stdout
var streamWriter = new N3.StreamWriter({ 'gtfs': 'http://vocab.gtfs.org/terms#',
                                         'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                                         'foaf' : 'http://xmlns.com/foaf/0.1/',
                                         'dct' : 'http://purl.org/dc/terms/',
                                         'rdfs' : 'http://www.w3.org/2000/01/rdf-schema#',
                                         'owl' : 'http://www.w3.org/2002/07/owl#',
                                         'xsd' : 'http://www.w3.org/2001/XMLSchema#',
                                         'vann' : 'http://purl.org/vocab/vann/',
                                         'skos' : 'http://www.w3.org/2004/02/skos/core#',
                                         'dcat' : 'http://www.w3.org/ns/dcat#'});
streamWriter.pipe(process.stdout);
var options = {
  feedname : feedname,
  baseuri : "http://data.example.org/sample-feed/0.1/"
};
gtfscsv2rdf(fs.createReadStream(path), streamWriter, options);