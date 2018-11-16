
const request = require("request");
const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const BASE_URL=''//replace this with your website url

const options = {
  uri: '',//replace this with your website url
  transform: function (body) {
    return cheerio.load(body);
  }
};


var downloadImage = function(uri, callback){
  let filename='images/'+uri.split('/')[2]//to get the unique filename from the url
  uri=BASE_URL+uri
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


rp(options)
    .then(function (data) {
	var length=data('a').length
	length=10
	for(var i=5;i<length;i++){
		console.log(data('a')[i].attribs.href);
		if(data('a')[i].attribs.href.split('/')[2].split('.')[1]==='JPG')//check if url is an image or not
			downloadImage(data('a')[i].attribs.href,()=>{});
	}

    })
    .catch(function (err) {
	console.log(err);
    });

