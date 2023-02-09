console.log('js file loaded')

//


const submits = (e) => {
    // e.preventDefault();
    e.preventDefault();

    const place = document.getElementById('place').value
    console.log(place)
    var url = 'http://localhost:3000/weather?address=' + place;
    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log(data)
            document.getElementById('output').innerText = JSON.stringify(data);
        })
    })

    // console.log(e)
    // console.log('button submitted')

}

