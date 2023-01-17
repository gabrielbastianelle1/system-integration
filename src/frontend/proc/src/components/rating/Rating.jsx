import Title from "../Title";
import Form from "./Form";

export default function Rating() {
    return (
        <main className="flex flex-col flex-grow shadow">
            <Title title="Order movies by amount of rating in a given year" />
            <Form />
        </main>
    );
}
