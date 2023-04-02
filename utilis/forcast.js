const request = require('request');
const proxy = require("node-global-proxy").default;
const chalk = require('chalk');

// proxy.setConfig({
//     http: "http://10.7.0.1:8080",
//     https: "http://10.7.0.1:8080"

// });
// proxy.start();

const forcast = (latitude, longitude, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=fb0c6dfbe45daf8c8ed52ba40998efce&query=';
    url = url.concat(latitude, ',', longitude);
    // url+=address;
    console.log(url);
    request({ url: url, json: true }, (error, response) => {
        console.log(error)
        if (error)
            callback(error, null);
        //  else if((responce.body.error))
        //     callback('unable to fetch, Any valid address')
        else {
            const data = response.body.current;
            // console.log('hellow from forcast');
            // console.log(data)
            callback(null, data);

            // console.log(data);
            // console.log(error);
        }
        console.log(chalk.cyanBright.bold("exit from Forcast"))
    })
}
// const fun1 = (message) => {
//     console.log(message);
// }
// forcast(40.7306, -73.9866, fun1);

//module export
module.exports = forcast;