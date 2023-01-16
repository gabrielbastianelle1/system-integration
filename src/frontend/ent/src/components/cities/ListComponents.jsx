import { useState, useRef, useEffect } from 'react'
import OutsideClick from '../../utils/outsideClick'

export function ListItem({
    name,
    id,
}) {
    return (
        <>
            <li>{name}</li>
            <li>{id}</li>
        </>
    )
}

export function ListRow({ children, city }) {
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
                <ItemDrop city={city} />
            </span>
        </span>
    )
}

export function ItemDrop({ city }) {
    return (
        <div className="grid text-white gap-y-3 p-4">
            <li>
                <span className="font-bold">geom</span>:{' '}
                {city.geom || 'N/A'}
            </li>
            <li>
                <span className="font-bold">created_on</span>:{' '}
                {city.created_on || 'N/A'}
            </li>
            <li>
                <span className="font-bold">updated_on</span>:{' '}
                {city.updated_on || 'N/A'}
            </li>
        </div>
    )
}
