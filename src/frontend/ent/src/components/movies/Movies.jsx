import List from './List'
import Title from '../Title'

export default function Movies() {
    return (
        <main className="flex-grow shadow">
            <Title title="Movies"/>
            <List />
        </main>
    )
}
