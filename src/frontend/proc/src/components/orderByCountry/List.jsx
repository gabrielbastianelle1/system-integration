import { useState, useEffect } from "react";
import { orderRequest } from "../../services/service.requests";
import HeaderList from "./HeaderList";
import { ListItem, ListRow } from "./ListComponents";

export default function List({ options, order }) {
    const [data, setData] = useState(undefined);

    useEffect(() => {
        orderRequest(order)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, [order]);

    if (data === undefined) {
        return <div>loading</div>;
    }

    if (options === undefined || order === undefined) {
        return <div></div>;
    }

    return (
        <>
            <div className="relative flex flex-col w-11/12 m-auto lg:h-3/6">
                <div className=" lg:overflow-y-scroll">
                    <HeaderList />
                    <div>
                        {data.map((value) => {
                            return (
                                <ListRow data={value}>
                                    <ListItem
                                        country={value[0]}
                                        totalMovies={value[1]}
                                    />
                                </ListRow>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
