import axios from 'axios'

export function getAllCities() {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                "http://localhost:20002/api/tile/all"
            )
            return result(response)
        } catch (error) {
            return reject(error)
        }
    })
}

export function getAllMoviesName({id}) {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                `http://localhost:20001/api/cities/getmovies/${id}`
            )
            return result(response)
        } catch (error) {
            return reject(error)
        }
    })
}

export function getAllCitiesRegion(neLat, neLng, swLat, swLng) {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                `http://localhost:20002/api/tile?neLat=${neLat}&neLng=${neLng}&swLat=${swLat}&swLng=${swLng}`
            )
            return result(response)
        } catch (error) {
            return reject(error)
        }
    })
}