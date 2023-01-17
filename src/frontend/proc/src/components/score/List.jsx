import { useState, useEffect } from "react";
import { scoreRequest } from "../../services/service.requests";
import HeaderList from "./HeaderList";
import { ListItem, ListRow } from "./ListComponents";

export default function List({ options, score }) {
    const [data, setData] = useState(undefined);

    useEffect(() => {
        scoreRequest(score)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, [score]);

    if (data === undefined) {
        return <div>loading</div>;
    }

    if (options === undefined || score === undefined) {
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
                                        title={value[0]}
                                        score={value[1]}
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
