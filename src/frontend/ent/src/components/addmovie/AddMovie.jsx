import Title from "../Title"
import Form from "./Form"

export default function AddMovie(){
    return (
        <div className="flex-grow">
            <Title title="Add movie"/>
            <Form/>
        </div>
    )
}