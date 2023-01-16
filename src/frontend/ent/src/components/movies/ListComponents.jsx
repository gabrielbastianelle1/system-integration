import { useState, useRef, useEffect } from 'react'
import OutsideClick from '../../utils/outsideClick'

export function ListItem({
    title,
    id,
}) {
    return (
        <>
            <li>{title}</li>
            <li>{id}</li>
        </>
    )
}

export function ListRow({ children, movie }) {
    const [dropBox, setDropBox] = useState(false)
    const row = useRef(null)
    const rowOutsideClick = OutsideClick(row)

    useEffect(() => {
        if (rowOutsideClick) {
            setDropBox(false)
        }
    }, [rowOutsideClick])

    const toggleDropBox = () => {
        setDropBox(!dropBox)
    }

    return (
        <span ref={row} onClick={toggleDropBox}>
            <ul className="bg-[#303030] text-white grid items-center shadow-inner grid-cols-2 p-4 hover:bg-slate-700 hover:cursor-pointer">
                {children}
            </ul>
            <span className={`${dropBox ? 'block' : 'hidden'}`}>
                <ItemDrop movie={movie} />
            </span>
        </span>
    )
}

export function ItemDrop({ movie }) {
    return (
        <div className="grid text-white gap-y-3 p-4">
            <li>
                <span className="font-bold">director</span>:{' '}
                {movie.director || 'N/A'}
            </li>
            <li>
                <span className="font-bold">duration</span>:{' '}
                {movie.duration || 'N/A'}
            </li>
            <li>
                <span className="font-bold">listed_in</span>:{' '}
                {movie.listed_in || 'N/A'}
            </li>
            <li>
                <span className="font-bold">rating</span>:{' '}
                {movie.rating || 'N/A'}
            </li>
            <li>
                <span className="font-bold">score</span>:{' '}
                {movie.score || 'N/A'}
            </li>
            <li>
                <span className="font-bold">created_on</span>:{' '}
                {movie.created_on || 'N/A'}
            </li>
            <li>
                <span className="font-bold">updated_on</span>:{' '}
                {movie.updated_on || 'N/A'}
            </li>
        </div>
    )
}
