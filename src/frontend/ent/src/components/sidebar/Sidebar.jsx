export default function Sidebar() {
    return (
        <main className="bg-[#303030] text-white shadow hidden min-w-[280px] lg:flex flex-col bg-sidebar">
            <a href="/">
                <p className=" relative hr w-full py-5 flex justify-center text-2xl cursor-pointer">
                    Cities
                </p>
            </a>
            <a href="/movies">
                <p className=" relative hr w-full py-5 flex justify-center text-2xl cursor-pointer">
                    Movies
                </p>
            </a>
            <a href="/movies/add">
                <p className=" relative hr w-full py-5 flex justify-center text-2xl cursor-pointer">
                    Add movie
                </p>
            </a>
        </main>
    )
}
