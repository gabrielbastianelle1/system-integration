import axios from "axios";

export function orderRequest(order) {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                `http://localhost:20004/api/movies/order?order=${order}`
            );
            return result(response);
        } catch (error) {
            return reject(error);
        }
    });
}

export function scoreRequest(score) {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                `http://localhost:20004/api/movies/score?score=${score}`
            );
            return result(response);
        } catch (error) {
            return reject(error);
        }
    });
}

export function ratingRequest(year) {
    return new Promise(async (result, reject) => {
        try {
            let response = await axios.get(
                `http://localhost:20004/api/movies/rating?year=${year}`
            );
            return result(response);
        } catch (error) {
            return reject(error);
        }
    });
}
