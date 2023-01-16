import axios from 'axios'

export function getAllCities() {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                "http://localhost:20002/api/tile?neLat=-15.227051&neLng=36.818820&swLat=12.524414&swLng=54.264442"
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