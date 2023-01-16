import axios from 'axios'

export function getAllCities() {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                "http://localhost:20001/api/cities/"
            )
            return result(response)
        } catch (error) {
            return reject(error)
        }
    })
}