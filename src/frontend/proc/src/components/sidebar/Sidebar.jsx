export default function Sidebar() {
    return (
        <main className="bg-[#303030] text-white shadow hidden min-w-[280px] lg:flex flex-col bg-sidebar">
            <a href="/">
                <p className=" relative hr w-full py-5 flex justify-center text-2xl cursor-pointer">
                    Home
                </p>
            </a>
            <a href="/order">
                <p className=" relative hr w-full py-5 flex justify-center text-2xl cursor-pointer">
                    Order country
                </p>
            </a>
            <a href="/score">
                <p className=" relative hr w-full py-5 flex justify-center text-2xl cursor-pointer">
                    Search by score
                </p>
            </a>
            <a href="/rating">
                <p className=" relative hr w-full py-5 flex justify-center text-2xl cursor-pointer">
                    Order rating
                </p>
            </a>
        </main>
    );
}
