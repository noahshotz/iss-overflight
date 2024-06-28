import React from "react"
import { IssDataProvider } from './context/IssDataProvider';
import { TLEDataProvider } from "./context/TleDataProvider";
import { Sidebar } from "./components/Sidebar"
import { MapView } from "./components/MapView"
import { DataOverlay } from "./components/DataOverlay";

function App() {

  return (
    <React.Fragment>
      <IssDataProvider>
        <TLEDataProvider>
          <DataOverlay />
          <MapView />
        </TLEDataProvider>
      </IssDataProvider>
    </React.Fragment >
  )
}

export default App
