import { useState } from "react";
import heatmapImg from "../images/heatmap.png";
import tvLogo from "../images/icons/live-tv.svg";

export default function Heatmap({ location, area }) {
  const [isWatching, setIsWatching] = useState(false);

  const handleWatchNowClick = (e) => {
    setIsWatching(true);
  };

  return (
    <div className="heatmap">
      <div className="heatmap-header">
        <h3 className="heatmap-title">Heat Map</h3>
        <p>
          {location} - {area}
        </p>
      </div>
      <div className="heatmap-img">
        {!isWatching ? (
          <>
            <img src={heatmapImg} alt="Heat Map" height={434} width={572} />
            <button onClick={handleWatchNowClick}>
              Watch Video <img src={tvLogo} alt="tv logo" />
            </button>
          </>
        ) : (
          <object
            data={`./media/${area}/output-seg-heat.avi`}
            height={434}
            width={572}
          >
            <param name="src" value={`./media/${area}/output-seg-heat.avi`} />
            <embed
              src={`./media/${area}/output-seg-heat.avi`}
              type="video/avi"
            />
          </object>
        )}
      </div>
    </div>
  );
}
