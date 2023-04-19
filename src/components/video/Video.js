import { useCallback, useEffect, useRef, useState } from "react";
import pauseIcon from "../../images/icons/pause.svg";
import playIcon from "../../images/icons/play.svg";
import startOverIcon from "../../images/icons/start-over.svg";
import closeIcon from "../../images/icons/close.svg";
import "./Video.scss";

export default function Video({
  children,
  showCloseButton,
  onClose,
  ...props
}) {
  const [pause, setPause] = useState(false);
  const [max, setMax] = useState(0);
  const [progress, setProgress] = useState(100);
  const videoRef = useRef();

  function handlePlayPause() {
    if (pause) videoRef.current.play();
    else videoRef.current.pause();
    setPause(!pause);
  }

  const handleTimeUpdate = (e) => {
    if (!max) setMax(e.target.duration);
    setProgress(e.target.currentTime);
  };

  const handleSeekVideo = (e) => {
    const progress = e.target;
    const rect = progress.getBoundingClientRect();
    const pos = (e.pageX - rect.left) / progress.offsetWidth;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const handleStartOver = (e) => {
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="video-container">
      <video
        {...props}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        controls={false}
      >
        {children}
      </video>
      {showCloseButton && (
        <img
          className="close-video"
          onClick={onClose}
          src={closeIcon}
          alt="Close"
          width={24}
          height={24}
        />
      )}
      <div className="controls">
        <div className="progress">
          <progress
            id="progress"
            onClick={handleSeekVideo}
            value={progress}
            min="0"
            max={max}
          ></progress>
        </div>
        <div className="video-control-buttons">
          <img
            id="playpause"
            onClick={handlePlayPause}
            src={pause ? playIcon : pauseIcon}
            alt="Play/Pause"
            width={40}
            height={40}
          />
          <img
            id="start-over"
            onClick={handleStartOver}
            src={startOverIcon}
            alt="start over"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
}
