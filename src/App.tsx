import React from "react"
import { IssDataProvider } from './context/IssDataProvider';
import { Sidebar } from "./components/Sidebar"
import { MapView } from "./components/MapView"

function App() {

  return (
    <React.Fragment>
      <IssDataProvider>
        <div className="wrapper dark:bg-zinc-900">
          <Sidebar />
          <div className="sm:ml-64">
            <MapView />
          </div>
        </div>
      </IssDataProvider>
    </React.Fragment>
  )
}

export default App
