import { useState, useEffect } from "react";
import { getAllMovies } from "../../services/service.movies";
import Search from "../Search";
import HeaderList from "./HeaderList";
import { ListItem, ListRow } from "./ListComponents";

export default function List() {
    const [movies, setMovies] = useState([]);
    const [moviesFiltered, setMoviesFiltered] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((response) => {
                setMovies(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        setMoviesFiltered(
            movies.filter((movie) => movie.title.includes(search))
        );
    }, [search]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    if (movies.length === 0) {
        return <div>loading</div>;
    }

    return (
        <>
            <Search handleChange={handleChange} />
            <div className="relative flex flex-col w-11/12 m-auto lg:h-3/6">
                <div className=" lg:overflow-y-scroll">
                    <HeaderList />
                    <div>
                        {search.length === 0 ? (
                            <>
                                {movies.map((movie) => {
                                    return (
                                        <ListRow movie={movie}>
                                            <ListItem
                                                title={movie.title}
                                                id={movie.id}
                                            />
                                        </ListRow>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {moviesFiltered.map((movie) => {
                                    return (
                                        <ListRow movie={movie}>
                                            <ListItem
                                                title={movie.title}
                                                id={movie.id}
                                            />
                                        </ListRow>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
