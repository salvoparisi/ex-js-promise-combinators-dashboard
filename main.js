async function fetchUrl(url) {
    const res = await fetch(url)
    const obj = res.json()
    return obj
}

async function getDestination(query) {
    const [city] = await fetchUrl(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
    const cityObj = {
        name: city.name,
        country: city.country
    }
    return cityObj
}

async function getWeathers(query) {
    const [weather] = await fetchUrl(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
    const weatherObj = {
        temperature: weather.temperature,
        weather: weather.weather_description
    }
    return weatherObj
}

async function getAirports(query) {
    const [airport] = await fetchUrl(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
    const airportObj = {
        airport: airport.name
    }
    return airportObj
}

async function getDashboardData(query) {
    let obj
    const destinations = getDestination(query)
    const weathers = getWeathers(query)
    const airports = getAirports(query)
    Promise.all([destinations, weathers, airports])
        .then(result => {
            obj = { ...result[0], ...result[1], ...result[2] }
            console.log(obj);

        })

}

getDashboardData("Paris")