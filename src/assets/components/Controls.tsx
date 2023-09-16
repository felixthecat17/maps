import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Places from "./Places";

function Controls() {
  const [controlClass, setControlClass] = useState(false);
  const classHandler = () => {
    setControlClass(controlClass === true ? false : true);
  };

  const [office, setOffice] = useState<google.maps.LatLngLiteral>();
  return (
    <div className="controls" data-toggle={controlClass && "true"}>
      <div className="header">
        <a onClick={classHandler}>
          <FontAwesomeIcon icon={faBarsStaggered} size="lg" />
        </a>
      </div>
      <div className="search-container">
        <Places
          setOffice={(position) => {
            setOffice(position);
          }}
        />
      </div>
    </div>
  );
}
export default Controls;
