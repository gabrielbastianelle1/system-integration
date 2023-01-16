import { useState,useEffect } from "react"
import { getAllCities } from "../../services/service.cities"
import { addMovies } from "../../services/service.movies"

export default function Form(){
    const [cities, setCities] = useState(undefined)
    const [titleDropboxCities, setTitleDropboxCities] = useState('Cities')
    const [idReturnedFromDropBoxCities, setIdReturnedFromDropBoxCities] =
        useState(undefined)
    const [title, setTitle] = useState(undefined)
    const [director, setDirector] = useState(undefined)
    const [duration, setDuration] = useState(undefined)
    const [rating, setRating] = useState(undefined)
    const [listed_in, setListed_in] = useState(undefined)
    const [score, setScore] = useState(undefined)

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeDirector = (event) => {
        setDirector(event.target.value)
    }

    const onChangeDuration = (event) => {
        setDuration(event.target.value)
    }

    const onChangeRating = (event) => {
        setRating(event.target.value)
    }

    const onChangeListed = (event) => {
        setListed_in(event.target.value)
    }

    const onChangeScore = (event) => {
        setScore(event.target.value)
    }

    useEffect(() => {
        getAllCities()
            .then((response) => {
                console.log(response.data)
                setCities(response.data)
            })
            .catch(error => console.log(error))
    },[])

    const handleSubmit = () => {
        try {
            let response = addMovies({
                title: title,
                director: director,
                duration: duration,
                rating: rating,
                listed_in: listed_in,
                score: score,
                city_id: idReturnedFromDropBoxCities
            })
        } catch (error) {

        }
    }

    if (cities === undefined) {
        return(
            <div>loading cities</div>
        )
    }

    return(
        <form className="form text-white grid-cols-2 grid-rows-4 gap-y-12 gap-x-4">
            <div className="item-form">
                <label>Title: </label>
                <input
                    className="input"
                    type="text"
                    onChange={onChangeTitle}
                />
            </div>
            <div className="item-form">
                <label>Director: </label>
                <input
                    className="input"
                    type="text"
                    onChange={onChangeDirector}
                />
            </div>
            <div className="item-form">
                <label>Duration: </label>
                <input
                    className="input"
                    type="text"
                    onChange={onChangeDuration}
                />
            </div>
            <div className="item-form">
                <label>Rating: </label>
                <input
                    className="input"
                    type="text"
                    onChange={onChangeRating}
                />
            </div>
            <div className="item-form">
                <label>Category: </label>
                <input
                    className="input"
                    type="text"
                    onChange={onChangeListed}
                />
            </div>
            <div className="item-form">
                <label>Score: </label>
                <input
                    className="input"
                    type="number"
                    onChange={onChangeScore}
                    max={10}
                    min={0}
                />
            </div>
            <Dropbox label="City"
                titleDropbox={titleDropboxCities}
                setTitleDropbox={setTitleDropboxCities}
                setIdReturnedFromDropBox={setIdReturnedFromDropBoxCities}
                dataToShowInDropbox={cities}
                field="name"
            />
            <button onClick={handleSubmit} className="button text-black text-lg">Enviar</button>
        </form>
    )
}

export function Dropbox({
    label,
    titleDropbox,
    setTitleDropbox,
    field,
    dataToShowInDropbox,
    setIdReturnedFromDropBox
}) {
    const [dropdown, setDropdown] = useState(false)

    const openDropdown = (event) => {
        setDropdown(!dropdown)
    }

    const handleClick = (event, optionChosen, idChosen) => {
        setTitleDropbox(optionChosen)
        setIdReturnedFromDropBox(idChosen)
        setDropdown(false)
    }

    return (
        <div className="relative">
            <label htmlFor="">{label}: </label>
            <button
                onClick={openDropdown}
                className=" ml-5 border hover:bg-gray-100 focus:ring-2 focus:ring-slate-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                type="button"
            >
                {titleDropbox}
            </button>
            <div
                className={`${
                    dropdown ? 'block' : 'hidden'
                } absolute left-20 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
            >
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    {dataToShowInDropbox.map((value, index) => {
                        return (
                            <li key={index}>
                                <p
                                    onClick={(event) =>
                                        handleClick(
                                            event,
                                            value[field],
                                            value['id']
                                        )
                                    }
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {value[field]}
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
