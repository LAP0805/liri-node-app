var myFunctions = require("./myfunctions.js");

if (process.argv[2] === "concert-this") {
    myFunctions.bands();
} else if (process.argv[2] === "spotify-this-song") {
    myFunctions.song();
} else if (process.argv[2] === "movie-this") {
    myFunctions.movie();
} else if (process.argv[2] === "do-what-it-says") {
    myFunctions.doIt();
} else if (process.argv[2] != "concert-this" && process.argv[2] != "spotify-this-song" && process.argv[2] != "movie-this" && process.argv[2] != "do-what-it-says") {
    console.log("Please use the commands listed in the README file to use the liri node app")
}