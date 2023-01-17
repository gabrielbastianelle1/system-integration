import { useState } from "react";
import List from "./List";

export default function Form() {
    const [options, setOptions] = useState(undefined);
    const [order, setOrder] = useState(undefined);

    const handleClick = (event) => {
        event.preventDefault();
        setOrder(event.target.innerHTML);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setOptions(true);
    };

    return (
        <>
            <span className="flex flex-col items-center">
                <h1 className="text-white text-2xl mb-5">Choose</h1>
                <form className="form grid-cols-2">
                    <button
                        onClick={handleClick}
                        className="button w-1/2 justify-self-center text-black text-base"
                    >
                        desc
                    </button>
                    <button
                        onClick={handleClick}
                        className="button w-1/2 justify-self-center text-black text-base"
                    >
                        asc
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="button col-span-2 justify-self-center w-1/2 text-black text-base"
                    >
                        send
                    </button>
                </form>
            </span>
            <List options={options} order={order} />
        </>
    );
}
