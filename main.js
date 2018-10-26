var bodyparser=require('body-parser');
var urlencod = bodyparser.urlencoded({extended:true});
var fs=require('fs');
var coinClient = require("coinbase").Client;
var coinclient = new coinClient({'apiKey':'ABC','apiSecret':'CDERF'})
var express = require('express');
var uniqid = require('uniqid');
app = express();
var curSymbol="";
var readjson = fs.readFileSync('conv.txt','utf8');
var SFDC = require('./SFDC');
//console.log(readjson);
var curobj=JSON.parse(readjson);
app.get("/ETHPrice1.htm",function(r,s){
s.sendFile(__dirname+"/ETHPrice1.htm");
});
//
//const {Pool,Client} = require('pg');
//const connectionString = 'postgres://verznuaghqllpg:2a01d57c48481932d195c916b7d91e4291c0e33b7a00670d8ccc10ff7d68ef0d@ec2-23-21-166-148.compute-1.amazonaws.com:5432/d42gnlk78nst1d';

//const pool = new Pool({
//  connectionString: connectionString,
//});

//const client = new Client({connectionString: connectionString});
//client.connect();




//
var temp=0;
var allprice={price:{spotprice:0.0,
				buyprice:0.0,
				sellprice:0.0},
				currency:"USD",
				currencySymbol:"$"
				};
app.get("/get_prices",urlencod,function(r,s){
	var curr=r.query.currency;
	var coin=r.query.coin;
	var curSymbol =eval("curobj."+curr+".symbol");
	const val = coin+"-"+curr;
	coinclient.getSpotPrice({'currencyPair': val},function(err,spotprice){
		allprice.price.spotprice=Number(spotprice.data.amount);
		allprice.currency=spotprice.data.currency;
		allprice.currencySymbol=curSymbol;
		console.log(allprice);
		coinclient.getBuyPrice({'currencyPair': val},function(err,buyprice){
			temp=Number(buyprice.data.amount);
			temp=temp+(temp*.01);
			allprice.price.buyprice=Number(temp.toFixed(2));
			console.log(allprice);
			coinclient.getSellPrice({'currencyPair': val},function(err,sellprice){
				temp=Number(sellprice.data.amount);
				temp=temp-(temp*.01);
				allprice.price.sellprice=Number(temp.toFixed(2));
				console.log(allprice);
				s.end(JSON.stringify(allprice));
				//
SFDC.insert(coin, allprice.price.spotprice);
				/*const query = {
				  text: 'INSERT INTO salesforce.cryptolog__c(name, price__c,ExternalId__c) VALUES($1, $2,$3)',
				  values: [coin, allprice.price.spotprice,uniqid()],
				};*/

				// callback
				/*client.query(query, (err, res) => {
				  if (err) {
				    console.log(err.stack)
				  } else {
				    console.log(res.rows[0])
				  }
				})*/

				//
			});
		});
	});
});
const server = app.listen(process.env.PORT||"8080",function(){
	const port = server.address().port;
	console.log("Emp App is listening on "+port);
	});
