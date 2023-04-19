import { useEffect, useState } from "react";
import heatmapImg from "../images/heatmap.png";
import tvLogo from "../images/icons/live-tv.svg";
import directionsIcon from "../images/icons/directions.svg";
import areaPath from "../images/icons/area-path.svg";
import Video from "../components/video/Video";
export default function Heatmap({ location, area }) {
  const [isWatching, setIsWatching] = useState(false);
  const [isImgError, setIsImgError] = useState(false);

  const handleWatchNowClick = (e) => {
    setIsWatching(true);
  };

  const handleHeatmapImgError = (e) => {
    setIsImgError(true);
  };

  const handleCloseVideo = (e) => {
    setIsWatching(false);
  };

  useEffect(() => {
    setIsWatching(false);
    setIsImgError(false);
  }, [area, location]);

  return (
    <div className="heatmap">
      <div className="heatmap-header">
        <h3 className="heatmap-title">Heat Map</h3>
        <p>
          {location} - {area}
        </p>
      </div>
      {!isImgError && (
        <div className="heatmap-content">
          <div className="heatmap-img">
            <>
              {!isWatching ? (
                <>
                  <img
                    src={`./media/${location}/${area}/heatmap.png`}
                    onError={handleHeatmapImgError}
                    alt="Heat Map"
                    height={434}
                    width={572}
                  />
                  <button className="play-button" onClick={handleWatchNowClick}>
                    Watch Video <img src={tvLogo} alt="tv logo" />
                  </button>
                </>
              ) : (
                <Video
                  height={434}
                  width={572}
                  autoPlay
                  showCloseButton
                  onClose={handleCloseVideo}
                >
                  <source
                    src={`./media/${location}/${area}/output-seg.mp4`}
                    type="video/mp4"
                  />
                </Video>
              )}
            </>
          </div>
          <div className="directions">
            <img src={directionsIcon} alt="directions" />
          </div>
        </div>
      )}
    </div>
  );
}
