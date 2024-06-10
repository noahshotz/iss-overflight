import { RiHomeLine } from "react-icons/ri";

export const Sidebar = () => {

    return (
        <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <RiHomeLine />
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )

}