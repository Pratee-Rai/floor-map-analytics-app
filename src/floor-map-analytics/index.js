import { useState } from "react";
import CreateGraph from "./createGraph";
import "./fma.css";
import heatmapImg from "../images/heatmap.png";
import tvLogo from "../images/icons/live-tv.svg";

const locationOptions = ["Hyderabad", "Noida", "Pune", "Chennai"];
const areaOptions = ["Bay Area 1", "Bay Area 2", "Cafeteria"];
const frequencyOptions = ["1 min", "5 min", "10 min", "15 min", "20 min", "1 hrs", "2hrs"];


export default function FloorMapAnalytics() {
  const [{ location, area, frequency, analyticsDate }, setFilters] = useState({
    location: locationOptions[0],
    area: areaOptions[0],
    frequency: frequencyOptions[0],
    analyticsDate: "",
  });
  const [isWatching, setIsWatching] = useState(false);

  const handlefiltersValueChange = (e) => {
    console.log(e.target.value);
    setFilters((filters) => ({ ...filters, [e.target.name]: e.target.value }));
  };

  const handleWatchNowClick = (e) => {
    setIsWatching(true);
  };
  return (
    <div>
      <h1>Floor Map Analytics</h1>
      <div className="fma-content">
        <div className="fma-content-header">
          <h2>Occupancy Statistics</h2>
          <div className="filters">
            <p>Filter By:</p>
            <select
              name="frequency"
              value={location}
              onChange={handlefiltersValueChange}
            >
              {getOptions(locationOptions)}
            </select>
            <select
              name="time"
              value={area}
              onChange={handlefiltersValueChange}
            >
              {getOptions(areaOptions)}
            </select>
            <input
              type="date"
              name="analyticsDate"
              placeholder="Date"
              value={analyticsDate}
              onChange={handlefiltersValueChange}
            />
          </div>
        </div>
        <div className="fma-content-start">
          <Heatmap {...{ location, area, handleWatchNowClick, isWatching }} />
          <div className="occupancy-rate">
            <div className="occupancy-rate-header">
              <h3 className="occupancy-rate-title">Occupancy Rate</h3>
              <div>
                <p>
                  {location} - {area}
                  <select
                    name="frequency"
                    value={frequency}
                    onChange={handlefiltersValueChange}
                  >
                    {getOptions(frequencyOptions)}
                  </select>
                </p>
              </div>

              {/* <select
                    name="timeselector"
                    value={area}
                    onChange={handlefiltersValueChange}
                  >
                    {getOptions(areaOptions)}
                  </select> */}
            </div>
            <>
              <CreateGraph />
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

const Heatmap = ({ location, area, handleWatchNowClick, isWatching }) => {
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
};

const getOptions = (options) =>
  options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
