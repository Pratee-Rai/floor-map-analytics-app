import { useEffect, useRef, useState } from "react";
import tvLogo from "../images/icons/live-tv.svg";
import directionsIcon from "../images/icons/directions.svg";
import Video from "../components/video/Video";
export default function Heatmap({ location, area }) {
  const [isWatching, setIsWatching] = useState(false);
  const [isImgError, setIsImgError] = useState(false);
  const hmImageContainerRef = useRef();
  const imgRef = useRef();
  const handleWatchNowClick = (e) => {
    setIsWatching(true);
  };

  const handleHeatmapImgError = (e) => {
    console.warn(e);
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
    <div className="heatmap d-flex flex-column col-lg-7">
      <div className="heatmap-header">
        <h3 className="heatmap-title">Heat Map</h3>
        <p>
          {location} - {area}
        </p>
      </div>
      <div className="row justify-content-center flex-grow-1 flex-column align-items-center">
        {!isImgError && (
          <div className="heatmap-content col-10 justify-content-center">
            <div ref={hmImageContainerRef} className="heatmap-img row">
              <>
                {!isWatching ? (
                  <>
                    <img
                      ref={imgRef}
                      className="col-12"
                      src={`./media/${location}/${area}/heatmap.png`}
                      onError={handleHeatmapImgError}
                      alt="Heat Map"
                    />
                    <button
                      className="play-button"
                      onClick={handleWatchNowClick}
                    >
                      Watch Video <img src={tvLogo} alt="tv logo" />
                    </button>
                  </>
                ) : (
                  <Video
                    className="col-12"
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
    </div>
  );
}
