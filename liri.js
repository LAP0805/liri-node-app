require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
moment().format();
var spotify = new Spotify(keys.spotify);


if (process.argv[2] === "concert-this") {
    var artist = process.argv.slice(3).join("");

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        var concerts = response.data
        if (response.data[0].venue === null) {
            console.log("No shows for that band are listed on Spotify")
        } else {
            for (var i = 0; i < concerts.length; i++) {

                var venue = ("Venue: " + response.data[i].venue.name);
                var location = ("Location: " + response.data[i].venue.city + "," + response.data[0].venue.country)
                var date = ("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));

                var toWrite = (venue + "\n" + location + "\n" + date + "\n");
                console.log(toWrite);

                fs.appendFile("log.txt", toWrite, function (err) {
                    if (err) {
                        console.log("Info not added to log")
                    } else {
                        //sing a happy song!//
                    }
                })
            }
        }

    }).catch(function (error) {
        if (error) {
            console.log("No shows for that band are listed on Spotify")
        }
    })

} else if (process.argv[2] === "spotify-this-song") {
    var song = process.argv.slice(3).join(" ");
    if (song === "") {
        song = "The Sign Ace of Base"
    }
    spotify.search({
            type: 'track',
            query: song
        }).then(function (data) {
            var theTracks = (data.tracks.items)

            if (data.tracks.items[0].album.artists[0] === null) {
                console.log("Wow, Spotify has never heard of that song! You are a true connoisseur.")
            } else {
                for (var i = 0; i < theTracks.length; i++) {
                    var artist = ("Artist: " + data.tracks.items[i].album.artists[0].name);
                    var track = ("Song title: " + data.tracks.items[i].name)
                    var album = ("Album: " + data.tracks.items[i].album.name);
                    var listen = ("Listen: " + data.tracks.items[i].external_urls.spotify)

                    var toWrite = (artist + "\n" + track + "\n" + album + "\n" + listen + "\n")
                    console.log(toWrite);

                    fs.appendFile("log.txt", toWrite, function (error) {
                        if (error) {
                            console.log("Info not written to log")
                        } else {
                            //do the hokey pokey//
                        }
                    })
                }
            }
        })
        .catch(function (error) {
            console.log("Wow, Spotify has never heard of that song! You are a true connoisseur.")
        })


} else if (process.argv[2] === "movie-this") {

    var movie = process.argv.slice(3).join(" ");
    if (movie === "") {
        movie = "Mr Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=3428a5a9").then(function (response) {

            var title = ("Title: " + response.data.Title);
            var year = ("Year: " + response.data.Released);
            var imdb = ("IMDB Rating: " + response.data.imdbRating);
            var rotten = ("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            var country = ("Country: " + response.data.Country);
            var language = ("Language: " + response.data.Language);
            var plot = ("Plot: " + response.data.Plot);
            var actors = ("Actors: " + response.data.Actors);

            var toWrite = (title + "\n" + year + "\n" + imdb + "\n" + rotten + "\n" + country + "\n" + language + "\n" + plot + "\n" + actors)
            console.log(toWrite);

            fs.appendFile("log.txt", toWrite, function (err) {
                if (err) {
                    console.log("not added to log")
                } else {
                    //do a little dance!!//
                }
            })
        })
        .catch(function (error) {
            console.log("Hm, we couldn't find that movie, sorry!")
        })


} else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var split = (data.split(","))
        var song = (split[1])
        spotify.search({
            type: "track",
            query: song
        }).then(function (data) {
            var tracks = (data.tracks.items)
            for (var i = 0; i < tracks.length; i++) {
                var artist = ("Artist: " + data.tracks.items[i].album.artists[0].name);
                var track = ("Song title: " + data.tracks.items[i].name)
                var album = ("Album: " + data.tracks.items[i].album.name);
                var listen = ("Listen: " + data.tracks.items[i].external_urls.spotify)

                var toWrite = (artist + "\n" + track + "\n" + album + "\n" + listen + "\n")
                console.log(toWrite);

                fs.appendFile("log.txt", toWrite, function (error) {
                    if (error) {
                        console.log("Info not added to log")
                    } else {
                        //do a little dance, make a little love, get down tonight!//
                    }
                })
            }
        })

    })
}