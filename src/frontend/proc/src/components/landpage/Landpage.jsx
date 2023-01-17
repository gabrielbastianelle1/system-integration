import Title from "../Title";

export default function Langpage() {
    return (
        <div className="flex flex-col flex-grow items-center text-white">
            <Title title="Systems Integration" />
            <div className="space-y-4">
                <h1 className="text-lg">Trabalho desenvolvido por: </h1>
                <ul className="flex flex-col">
                    <li>Gabriel Bastianelle - 23421</li>
                    <li>Vasco Cardoso</li>
                    <li>Diogo Rosas</li>
                </ul>
            </div>
        </div>
    );
}
