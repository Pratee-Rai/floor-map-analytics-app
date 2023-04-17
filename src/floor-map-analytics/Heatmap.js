import { useEffect, useState } from "react";
import heatmapImg from "../images/heatmap.png";
import tvLogo from "../images/icons/live-tv.svg";
import directionsIcon from "../images/icons/directions.svg";
import areaPath from "../images/icons/area-path.svg";
export default function Heatmap({ location, area }) {
  const [isWatching, setIsWatching] = useState(false);

  const handleWatchNowClick = (e) => {
    setIsWatching(true);
  };

  useEffect(() => {
    setIsWatching(false);
  }, [area]);

  return (
    <div className="heatmap">
      <div className="heatmap-header">
        <h3 className="heatmap-title">Heat Map</h3>
        <p>
          {location} - {area}
        </p>
      </div>
      <div className="heatmap-content">
        <div className="heatmap-img">
          <>
            {!isWatching ? (
              <>
                <img src={heatmapImg} alt="Heat Map" height={434} width={572} />
                <button onClick={handleWatchNowClick}>
                  Watch Video <img src={tvLogo} alt="tv logo" />
                </button>
                <img
                  className="area-path-image"
                  src={areaPath}
                  alt="Path to different areas"
                />
              </>
            ) : (
              <video height={434} width={572} controls>
                <source src={`./media/${area}/output-seg-heat.mp4`} />
              </video>
            )}
          </>
        </div>
        <div className="directions">
          <img src={directionsIcon} alt="directions" />
        </div>
      </div>
    </div>
  );
}
