import { useEffect, useLayoutEffect, useRef, useState } from "react";
import tvLogo from "../images/icons/live-tv.svg";
import directionsIcon from "../images/icons/directions.svg";
import Video from "../components/video/Video";
import { getHeatmapVideo } from "../utilities/video";
export default function Heatmap({ location, area, timeRangeValue }) {
  const [isWatching, setIsWatching] = useState(false);
  const [isImgError, setIsImgError] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [heatmapVideoUrl, setHeatmapVideoUrl] = useState();
  console.log(heatmapVideoUrl);
  const hmImageContainerRef = useRef();
  const imgRef = useRef();
  const handleWatchNowClick = (e) => {
    setIsWatching(true);
  };

  const handleHeatmapImgError = (e) => {
    setIsImgError(true);
    setIsImgLoaded(false);
  };

  const handleLoadHeatmapImage = (e) => {
    setIsImgError(false);
    setIsImgLoaded(true);
  };

  const handleCloseVideo = (e) => {
    setIsWatching(false);
  };

  useLayoutEffect(() => {
    setHeatmapVideoUrl();
    getHeatmapVideo({
      timeRangeValue,
      location,
      area,
    }).then(({ url }) => {
      setHeatmapVideoUrl(url);
    });
    setIsWatching(false);
  }, [area, location, timeRangeValue]);

  useEffect(() => {
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
                      onLoad={handleLoadHeatmapImage}
                      alt="Heat Map"
                    />
                    {isImgLoaded && (
                      <button
                        className="play-button"
                        onClick={handleWatchNowClick}
                      >
                        Watch Video <img src={tvLogo} alt="tv logo" />
                      </button>
                    )}
                  </>
                ) : (
                  <Video
                    className="col-12"
                    autoPlay
                    showCloseButton
                    onClose={handleCloseVideo}
                    loading={heatmapVideoUrl ? false : true}
                  >
                    {heatmapVideoUrl && (
                      <>
                        <source src={heatmapVideoUrl} type="video/mp4" />
                        <source
                          src={`./media/${location}/${area}/output-seg.mp4`}
                          type="video/mp4"
                        />
                      </>
                    )}
                  </Video>
                )}
              </>
            </div>
            {isImgLoaded && (
              <div className="directions">
                <img src={directionsIcon} alt="directions" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
