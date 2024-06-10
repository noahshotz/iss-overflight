import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

export const MapView = () => {

    return (
        <div className="w-full h-[100vh] bg-sky-300">
            <Map
                mapboxAccessToken="pk.eyJ1IjoiZWdlbnVzbWF4IiwiYSI6ImNsdm9maWs2YjBsZDIyaXAxczl1dnBjZDkifQ.5tifuxKwqOemhknU8QEKuA"
                initialViewState={{
                    longitude: 13.404954,
                    latitude: 52.520008,
                    zoom: 2
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            />
        </div>
    )

}