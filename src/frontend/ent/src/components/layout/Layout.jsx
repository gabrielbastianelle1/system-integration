import Sidebar from "../sidebar/Sidebar"

export default function Layout({ children }) {

    return (
        <>
            <div className="bg-userBackground flex flex-col lg:flex-row h-screen lg:overflow-hidden w-screen">
                <Sidebar/>
                {children}
            </div>
        </>
    )
}
