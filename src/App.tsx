import React from "react"
import { SatDataProvider } from './context/SatDataProvider';
import { TLEDataProvider } from "./context/TleDataProvider";
import { MapView } from "./components/MapView"
import { DataOverlay } from "./components/DataOverlay";

function App() {

  return (
    <React.Fragment>
      <SatDataProvider>
        <TLEDataProvider>
          <DataOverlay />
          <MapView />
        </TLEDataProvider>
      </SatDataProvider>
    </React.Fragment >
  )
}

export default App
