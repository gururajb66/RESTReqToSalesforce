console.log('very beggining');
var nforce = require('nforce');
// create the connection with the Salesforce connected app
var org = nforce.createConnection({
  clientId: '6322903597469351781',
  clientSecret: '3MVG9vrJTfRxlfl4jUe61vCy119efRZic.aE7PwV0drwWgPZ48wlp8In3WhxhAdjZwTLO.SVHDUBj0p.CfVKq',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  mode: 'single'
});
// authenticate and return OAuth token
org.authenticate({
  username: 'gururaj4cloud@gmail.com',
  password: 'S2lesforce'
}, function(err, resp){
  if (!err) {
    console.log('Successfully logged in! Cached Token: ' + org.oauth.access_token);
    // execute the query
    org.query({ query: 'select id, name from account limit 5' }, function(err, resp){
      if(!err && resp.records) {
        // output the account names
        for (i=0; i<resp.records.length;i++) {
          console.log(resp.records[i].get('name'));
        }
      }
    });
  }
  if (err) console.log(err);
});
