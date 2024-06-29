import React from "react"
import { SatDataProvider } from './context/SatDataProvider';
import { TLEDataProvider } from "./context/TleDataProvider";
import { MapView } from "./components/MapView"
import { DataOverlay } from "./components/DataOverlay";
import { UserLocationProvider } from "./context/userLocationContext";

function App() {

  return (
    <React.Fragment>
      <SatDataProvider>
        <TLEDataProvider>
          <DataOverlay />
          <UserLocationProvider>
            <MapView />
          </UserLocationProvider>
        </TLEDataProvider>
      </SatDataProvider>
    </React.Fragment >
  )
}

export default App
