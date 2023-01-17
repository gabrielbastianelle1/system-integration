import { useState } from "react";
import List from "./List";

export default function Form() {
    const [options, setOptions] = useState(undefined);
    const [score, setScore] = useState(undefined);

    const onChangeScore = (event) => {
        event.preventDefault();
        setScore(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setOptions(true);
    };

    return (
        <>
            <span className="flex flex-col items-center">
                <h1 className="text-white text-2xl mb-5">
                    Insert a minimum score:{" "}
                </h1>
                <form className="form grid-cols-2">
                    <div className="item-form col-span-2 justify-self-center w-1/2">
                        <label className="text-white">Score</label>
                        <input
                            className="input text-white"
                            type="number"
                            max={10}
                            min={0}
                            onChange={onChangeScore}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="button col-span-2 justify-self-center w-1/2 text-black text-base"
                    >
                        send
                    </button>
                </form>
            </span>
            <List options={options} score={score} />
        </>
    );
}
