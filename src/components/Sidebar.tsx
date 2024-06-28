import { CurrentDataTab } from "./CurrentDataTab";

export const Sidebar = () => {

    return (
        <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-[#0c0c0c]">
                <h1 className="font-bold text-4xl text-white leading-none mb-4">SATTRACK</h1>
                <CurrentDataTab />
            </div>
        </aside>
    )

}