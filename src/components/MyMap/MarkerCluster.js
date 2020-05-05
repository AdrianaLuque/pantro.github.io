import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeaflet } from "react-leaflet";
import { customMarker } from "./constants";

const mcg = L.markerClusterGroup();

const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();

  useEffect(() => {
    mcg.clearLayers();
    markers.forEach((house) =>
      L.circle(new L.LatLng(parseFloat(house.LATITUDE),parseFloat(house.LONGITUDE)), {
          fillColor : 'red',
          radius : 5,
          stroke : true,
          color : "black",
          weight : 0.4,
          fillOpacity : 1,
          layerId : 'UNICODE'
      })
        .addTo(mcg)
        .bindPopup('hola')
    );

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());
    // // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

export default MarkerCluster;