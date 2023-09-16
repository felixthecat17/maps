import { useLoadScript } from "@react-google-maps/api";

import Map from "../components/Map";

function MainMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA9iKQ-4RSE5CEfFTbZVm3v8441C2yudbA",
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
