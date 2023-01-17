import Title from "../Title";
import Form from "./Form";

export default function Score() {
    return (
        <main className="flex flex-col flex-grow shadow">
            <Title title="Order movies by minimum score" />
            <Form />
        </main>
    );
}
