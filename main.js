async function fetchUrl(url) {
    const res = await fetch(url)
    const obj = await res.json()
    return obj
}

async function getDestination(query) {
    try {
        const [city] = await fetchUrl(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
        const cityObj = {
            city: city.name,
            country: city.country
        }
        return cityObj
    } catch (error) {
        throw new Error('Non Posso recuperare la Destinazione')
    }
}

async function getWeathers(query) {
    try {
        const [weather] = await fetchUrl(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
        const weatherObj = {
            temperature: weather.temperature,
            weather: weather.weather_description
        }
        return weatherObj
    } catch (error) {
        throw new Error('Non posso recuperare il Meteo')
    }
}

async function getAirports(query) {
    try {
        const [airport] = await fetchUrl(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
        const airportObj = {
            airport: airport.name
        }
        return airportObj
    } catch (error) {
        throw new Error('Non posso recuperare gli Aereoporti')
    }
}

async function getDashboardData(query) {
    let obj
    const destinations = getDestination(query)
    const weathers = getWeathers(query)
    const airports = getAirports(query)
    await Promise.all([destinations, weathers, airports])
        .then(result => {
            obj = { ...result[0], ...result[1], ...result[2] }
        })
        .catch(error => console.error(error))
    return obj
}

(async () => {
    getDashboardData('london')
        .then(obj => {
            console.log(`${obj.city} is in ${obj.country}.\n` +
                `Todey there are ${obj.temperature} degrees and weather is ${obj.weather}.\n` +
                `The main airport is ${obj.airport}`
            )
        })
        .catch(error => console.error(error))
})()

