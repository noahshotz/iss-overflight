import React from "react"
import { Sidebar } from "./components/Sidebar"
import { MapView } from "./components/MapView"

function App() {

  return (
    <React.Fragment>
      <div className="wrapper dark:bg-zinc-900">
        <Sidebar />
        <div className="sm:ml-64">
          <MapView />
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
