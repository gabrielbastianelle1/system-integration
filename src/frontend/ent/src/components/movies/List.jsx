import { useState, useEffect } from 'react'
import { getAllMovies } from '../../services/service.movies'
import HeaderList from './HeaderList'
import { ListItem, ListRow } from './ListComponents'

export default function List() {

    const [movies, setMovies] = useState(undefined)

    useEffect(() => {
        getAllMovies()
            .then((response) => {
                setMovies(response.data)
            })
            .catch(error => console.log(error))
    },[])

    if (movies === undefined) {
        return(
            <div>loading</div>
        )
    }

    return (
        <div className="relative flex flex-col w-11/12 m-auto lg:h-3/6">
            <div className=" lg:overflow-y-scroll">
                <HeaderList
                />
                <div>
                    {
                        movies.map((movie) => {
                            return(
                                <ListRow movie={movie}>
                                    <ListItem title={movie.title} id={movie.id}/>
                                </ListRow>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
