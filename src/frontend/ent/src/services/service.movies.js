import axios from 'axios'

export function getAllMovies() {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                "http://localhost:20001/api/movies/"
            )
            return result(response)
        } catch (error) {
            return reject(error)
        }
    })
}

export function addMovies(movie) {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.post(
                "http://localhost:20001/api/movies/insert",
                movie
            )
            return result(response)
        } catch (error) {
            return reject(error)
        }
    })
}