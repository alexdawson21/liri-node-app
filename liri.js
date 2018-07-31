var dot = require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var command = process.argv[2];
var arg = process.argv[3];
var params = {screen_name: 'bootcamp213951'};
var fs = require("fs");
var songName = "";
var movieName = "";

// function Spotify(id, secret){
//     this.id = id;
//     this.secret = secret;
// }
// function Twitter(consumer_key, consumer_secret, access_token_key, access_token_secret){
//     this.consumer_key = consumer_key;
//     this.consumer_secret = consumer_secret;
//     this.access_token_key = access_token_key;
//     this.access_token_secret = access_token_secret;
// }
var spotifyobj = new Spotify({
    id: keys.spotify.id, 
    secret:keys.spotify.secret
});
var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret});
// console.log(client);
if(command == null){
    console.log("no command given");
}
if(command === "my-tweets"){

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) { 
        }
        for(i=0; i<tweets.length; i++)
        console.log(tweets[i].text);
      });
}
if(command === "spotify-this-song"){
   if(process.argv[3]==null){
       songName = "The Sign";
   }
   else{
    for(i=3; i< process.argv.length; i++){
     
         songName += process.argv[i]+" ";
    }
}
     spotifyobj.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    
    console.log("Artist: "+data.tracks.items[0].artists[0].name);
    console.log("Song: "+data.tracks.items[0].name);
    console.log("Album: "+data.tracks.items[0].album.name);
    console.log("Release Date: "+data.tracks.items[0].album.release_date);
    console.log("link: "+data.tracks.items[0].href);
      })
}
if(command === "movie"){
    if(process.argv[3]==null){
        movieName = "Mr Nobody";
    }
    else{
    for(i=3; i< process.argv.length; i++){
        movieName += process.argv[i];
    }
}
    request('http://www.omdbapi.com/?i=tt3896198&apikey=88e64470&t='+movieName, function (error, response, body) {
       fs.writeFile("omdb.txt", body, function(err){
           if(err){
              return console.log(err)
           }
       })
       fs.readFile("omdb.txt", "utf8", function(error, data){
        var dataArr = data.split(",");
        var title = dataArr[0].substr(1);
        var tomato = dataArr[28].substr(8);
           console.log(title);
           console.log(dataArr[1]);
           console.log(dataArr[32]);
           console.log("'Rotten Tomatoes':"+ tomato);
           console.log(dataArr[21]);
           console.log(dataArr[20]);
           console.log(dataArr[17]+dataArr[18]+dataArr[19])
           console.log(dataArr[13]+dataArr[14]+dataArr[15]+dataArr[16])
       })
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('Title:', body.Year); // Print the HTML for the Google homepage.
});
}
if(command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        var dataArr = data.split(",");
        command = dataArr[0]
        console.log(command);
        songName = dataArr[1].substring(1);
        songName = songName.slice(0,-1);
        movieName = dataArr[1];
    
    if(command === "my-tweets"){

        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) { 
            }
            for(i=0; i<tweets.length; i++)
            console.log(tweets[i].text);
          });
    }
    if(command === "movie"){
        for(i=3; i< process.argv.length; i++){
            movieName += process.argv[i];
        }
        request('http://www.omdbapi.com/?i=tt3896198&apikey=88e64470&t='+movieName, function (error, response, body) {
           fs.writeFile("omdb.txt", body, function(err){
               if(err){
                  return console.log(err)
               }
           })
           fs.readFile("omdb.txt", "utf8", function(error, data){
            var dataArr = data.split(",");
            var title = dataArr[0].substr(1);
            var tomato = dataArr[28].substr(8);
               console.log(title);
               console.log(dataArr[1]);
               console.log(dataArr[32]);
               console.log("'Rotten Tomatoes':"+ tomato);
               console.log(dataArr[21]);
               console.log(dataArr[20]);
               console.log(dataArr[17]+dataArr[18]+dataArr[19])
               console.log(dataArr[13]+dataArr[14]+dataArr[15]+dataArr[16])
           })
    //   console.log('error:', error); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log('Title:', body.Year); // Print the HTML for the Google homepage.
    });
    }
    if(command === "spotify-this-song"){
   
        console.log(songName);
         spotifyobj.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
          console.log(data.tracks.items[0].album.artists[0].name); 
        console.log("Artist: "+data.tracks.items[0].artists[0].name);
        console.log("Song: "+data.tracks.items[0].name);
        console.log("Album: "+data.tracks.items[0].album.name);
        console.log("Release Date: "+data.tracks.items[0].album.release_date);
        console.log("link: "+data.tracks.items[0].href);
          })
    }
})
}
