module.exports={	
	insert:function(a,b)
	{
	console.log('very beggining');
	require('dns').lookup(require('os').hostname(), function (err, add, fam) {
	  console.log('addr: '+add);
	});
	var nforce = require('nforce');
	// create the connection with the Salesforce connected app
	var org = nforce.createConnection({
	  clientId: '3MVG9vrJTfRxlfl4jUe61vCy119efRZic.aE7PwV0drwWgPZ48wlp8In3WhxhAdjZwTLO.SVHDUBj0p.CfVKq',
	  clientSecret: '6322903597469351781',
	  redirectUri: 'http://localhost:3000/oauth/_callback',
	  mode: 'single'
	});
	console.log(org);
	// authenticate and return OAuth token
	org.authenticate({
	authEndpoint:'https://login.salesforce.com/services/oauth2/authorize'		
	//username: 'gururaj4cloud@gmail.com',
	  //password: 'S2lesforcem6ljYhpuJwoWKYj1LPskmq1h'
	}, function(err, resp){
	  if (!err) {
	    console.log('Successfully logged in! Cached Token: ' + org.oauth.access_token);
		  console.log('resp '+JSON.stringify(resp));
	    oauth = resp;
	    var acc = nforce.createSObject('Account');
		acc.set('Name', a);
		acc.set('Description', b);
		org.insert({ sobject: acc, oauth: oauth }, function(err, resp){
		  if(!err) console.log('It worked!');
	});
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
	  if (err) console.log('Boss the error is : '+err+' the request is '+org);
	});
}
	
	}
