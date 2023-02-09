const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forcast = require('./utilis/forcast.js')
const geolocation = require('./utilis/geolocation.js')
const { dirname } = require('path')


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
                    if (error) {
                        console.log('didn\'t get data')
                        return res.send('erro');
                    }
                    else {
                        const place1 = data.place
                        // res.send({place:place1 , weather:'good'})
                        const d = { place: place1, weather: resp }
                        // console.log(d)
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

app.listen(3000, () => {
    console.log('listening on port 3000')
});