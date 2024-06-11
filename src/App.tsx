import React from "react"
import { IssDataProvider } from './context/IssDataProvider';
import { TLEDataProvider } from "./context/TleDataProvider";
import { Sidebar } from "./components/Sidebar"
import { MapView } from "./components/MapView"

function App() {

  return (
    <React.Fragment>
      <IssDataProvider>
        <TLEDataProvider>
          <div className="wrapper dark:bg-zinc-900">
            <Sidebar />
            <div className="sm:ml-64">
              <MapView />
            </div>
          </div>
        </TLEDataProvider>
      </IssDataProvider>
    </React.Fragment>
  )
}

export default App
