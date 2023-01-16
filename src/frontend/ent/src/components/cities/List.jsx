import { useState, useEffect } from 'react'
import { getAllCities } from '../../services/service.cities'
import HeaderList from './HeaderList'
import { ListItem, ListRow } from './ListComponents'

export default function List() {

    const [cities, setCities] = useState(undefined)

    useEffect(() => {
        getAllCities()
            .then((response) => {
                setCities(response.data)
            })
            .catch(error => console.log(error))
    },[])

    if (cities === undefined) {
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
                        cities.map((city) => {
                            return(
                                <ListRow city={city}>
                                    <ListItem name={city.name} id={city.id}/>
                                </ListRow>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
