console.log('js file loaded')

//


const submits = (e) => {
    // e.preventDefault();
    e.preventDefault();

    const place = document.getElementById('place').value
    console.log(place)
    var url = '/weather?address=' + place;
    fetch(url).then((response) => {
        response.json().then((data) => {
            // console.log(data)
            document.getElementById('output').innerText = "Address :" + data.place
            // document.getElementById('temp1').innerText = "Temparature is:" + data.weather.temperature
            document.getElementById('temp').innerHTML = "Temp is " + data.weather.temperature + "<sup>o</sup>C  and it's feels like " + data.weather.feelslike + "<sup>o</sup>C."
            document.getElementById('weather').innerHTML = "Weather is: " + data.weather.weather_descriptions[0] + '.'
        })
            .catch((err) => {
                getElementById('output').innerText = err
            })
    })

    // console.log(e)
    // console.log('button submitted')

}

