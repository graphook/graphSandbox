import rdfstore from 'rdfstore';
import fs from 'fs';

console.log('begin');
rdfstore.create(function(err, store){
  console.log('storeCreated');
  var rdf = fs.readFileSync('./data/data.ttl').toString();
  console.log('file read');
  store.load('text/turtle', rdf, function(s,d){
    console.log(s,d);
    store.execute("SELECT * WHERE { ?s ?p ?o } LIMIT 10", function(success, results){
      console.log(success, results);
    });
  });
});