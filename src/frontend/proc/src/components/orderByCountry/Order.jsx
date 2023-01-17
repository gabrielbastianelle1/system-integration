import Title from "../Title";
import Form from "./Form";

export default function Order() {
    return (
        <main className="flex flex-col flex-grow shadow">
            <Title title="Order country by total of movies" />
            <Form />
        </main>
    );
}
