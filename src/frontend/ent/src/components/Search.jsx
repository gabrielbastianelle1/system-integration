export default function Search({ handleChange }) {
    return (
        <div className=" lg:grid lg:grid-cols-1  lg:mb-16">
            <div className=" flex pb-5 pl-10 right-14 lg:right-28 lg:gap-y-2 lg:mb-8">
                <span className=" hidden lg:aboslute lg:inset-y-0 lg:left-0 lg:flex lg:items-center lg:pl-2">
                    <button type="submit" class="p-1 focus:outline-none ">
                        <svg
                            fill="none"
                            stroke="#ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            class="w-6 h-6"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </span>
                <input
                    className="w-64 bg-gray-50 border placeholder-grey-800 focus:ring-blue-500 border-blue-400 text-gray-900 text-sm rounded-lg focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    type="text"
                    placeholder="Pesquisar por nome"
                />
            </div>
        </div>
    );
}
