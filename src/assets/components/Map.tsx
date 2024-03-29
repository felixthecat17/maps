import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useMemo, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import Places from "./Places";
import { useGeolocated } from "react-geolocated";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
function Map() {
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 16, lng: 121 }), []);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "4276b48ec16047d1",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  /** for the controls  */

  const [controlClass, setControlClass] = useState(false);
  const [directions, setDirections] = useState<DirectionsResult>();
  const classHandler = () => {
    setControlClass(controlClass === true ? false : true);
  };

  const [office, setOffice] = useState<google.maps.LatLngLiteral>();
  const [destination, setDestination] = useState<google.maps.LatLngLiteral>();

  const [fromValue, setFromValue] = useState<string>();
  const [toValue, setToValue] = useState<string>();

  const LoadRoutes = (to: LatLngLiteral) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: office,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          console.log(result);
          setDirections(result);
          setControlClass(controlClass === true ? false : true);
        }
      }
    );
  };
  /*geolocation*/
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  return (
    <>
      <div className="map">
        <GoogleMap
          onClick={(e) => {
            const lat = e.latLng?.lat();
            const lng = e.latLng?.lng();

            if (lat && lng) {
              if (!office) {
                setOffice({ lat, lng });
                setFromValue("Clicked somewhere in the map");
              } else {
                setDestination({ lat, lng });
                setToValue("Clicked somewhere in the map");
                LoadRoutes({ lat, lng });
              }
            }
          }}
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          {office && (
            <>
              <Marker position={office} />
            </>
          )}

          {destination && (
            <>
              <Marker position={destination} />
            </>
          )}
        </GoogleMap>
      </div>

      <div className="controls" data-toggle={controlClass && "true"}>
        <div className="header">
          <a onClick={classHandler}>
            <FontAwesomeIcon icon={faBarsStaggered} size="lg" />
          </a>
        </div>
        <div className="search-container">
          <Places
            setOffice={(position, value) => {
              setOffice(position);
              console.log(position);
              mapRef.current?.panTo(position);
              if (position) {
                setFromValue(value);
              }
            }}
          />
        </div>
        <div className="results-container">
          <span className="label">
            Search or click/tap on the map to set routes.
          </span>

          <p className="route-info">
            From:&nbsp;
            {fromValue ? (
              fromValue
            ) : (
              <button
                onClick={() => {
                  if (coords) {
                    let currentLocation: LatLngLiteral;
                    currentLocation = {
                      lat: coords.latitude,
                      lng: coords.longitude,
                    };

                    setOffice(currentLocation);
                    setFromValue("Current location");
                    mapRef.current?.panTo(currentLocation);
                  }
                }}
              >
                Use location?
              </button>
            )}
          </p>
          {toValue && <p className="route-info">To:&nbsp;{toValue}</p>}
        </div>
      </div>
    </>
  );
}
export default Map;
