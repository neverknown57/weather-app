const express = require('express')
const path = require('path')
const hbs = require('hbs')
const chalk = require('chalk')
const forcast = require('./utilis/forcast.js')
const geolocation = require('./utilis/geolocation.js')
const proxy = require("node-global-proxy").default;

// proxy.setConfig({
//     http: "http://10.7.0.1:8080",
//     https: "http://10.7.0.1:8080"

// });
// proxy.start();

const port = process.env.PORT || 3000;
const { dirname } = require('path')
const { stringify } = require('querystring')


const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/templates/partials')
const templatesdir = path.join(__dirname, 'templates')
app.set('views', templatesdir)
console.log(templatesdir)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        user: 'saurabh'
    })
})
app.get('/about', (req, res) => {
    res.send({ place: 'india', wead: 'high' })
})
app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send('fetch:ip')
    else {
        geolocation(req.query.address, (error, data) => {
            if (error) return res.send(error)
            else {
                forcast(data.latitude, data.longitude, (error, resp) => {
                    console.log('calling forcast')
                    if (error) {
                        console.log('didn\'t get data')
                        return res.send('erro');
                    }
                    else {
                        // console.log('got data')
                        const place1 = data.place
                        // const weather = stringify(resp)
                        // console.log(chalk.bgBlue(weather))
                        // res.send({place:place1 , weather:'good'})
                        const d = { place: place1, weather: resp }
                        // console.log(chalk.bgRed(d))
                        // console.log(d.weather)
                        res.send(d)
                    }
                })
            }
        })
    }
})

app.get('*', (req, res) => {
    res.render('404not-found')
})

app.listen(port, () => {
    console.log(chalk.red('listening on port'), port)
});