import { useLoadScript } from "@react-google-maps/api";

import Map from "../components/Map";

function MainMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPSREACT_API,
    libraries: ["places"],
  });

  if (!isLoaded) return <p>Loading...</p>;
  return (
    <div className="main-container">
      <Map />
    </div>
  );
}
export default MainMap;
