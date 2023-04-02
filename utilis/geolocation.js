const request = require('request');
const chalk = require('chalk');
const proxy = require("node-global-proxy").default;

// proxy.setConfig("10.7.0.1:8080");

// proxy.system()

// proxy.setConfig({
//     http: "http://10.7.0.1:8080",
//     https: "http://10.7.0.1:8080"

// });

// proxy.start();

const geolocation = (address, callback) => {
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?&limit=1&access_token=pk.eyJ1IjoibmV2ZXJrbm93biIsImEiOiJjbGMzbXMxeWoyNWtsM3FvNWFrYm9kNmkzIn0.M1Deq2OV-rSrYq6v1_oS2w'
    request({ url: url1, json: true }, (error, response) => {
        console.log(url1);
        console.log('\n')
        // if (error)
        //     console.log(chalk.red(error))
        // console.log(address, 'geoloc Page')
        if (error)
            callback('Unable to connect api!', null)
        else if (response.body.features.length == 0)
            callback('Unable to fetch location. Try another location.', null);
        else {
            const loc = response.body
            const latitude = (loc.features[0].center[1])
            const longnitude = (loc.features[0].center[0])
            const place_name = (loc.features[0].place_name);
            const data = {
                latitude: latitude,
                longitude: longnitude,
                place: place_name
            }
            // console.log(place_name);
            // console.log(latitude, longnitude);
            callback(null, data);
        }
        console.log(chalk.green('Exit from GeoLocation'))
    })
}
// console.log("kaise ho bhai");
// const fun1 = (message) => {
//     console.log(message);
// }
// geolocation('New York', fun1);
// console.log("code");
// geolocation('Dausa',fun1);
// geolocation('Jaipur',fun1);

module.exports = geolocation;