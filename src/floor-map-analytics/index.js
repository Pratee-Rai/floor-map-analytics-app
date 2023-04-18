import { useState } from "react";
import CreateGraph from "./createGraph";
import Heatmap from "./Heatmap";
import "./fma.css";

const locationOptions = ["Hyderabad", "Noida", "Pune", "Chennai"];
const areaOptions = ["Bay Area 1", "Bay Area 2", "Cafeteria"];
const frequencyOptions = [
  "1 min",
  "5 min",
  "10 min",
  "15 min",
  "20 min",
  "1 hrs",
  "2hrs",
];

export default function FloorMapAnalytics() {
  const [{ location, area, frequency, analyticsDate }, setFilters] = useState({
    location: locationOptions[0],
    area: areaOptions[0],
    frequency: frequencyOptions[0],
    analyticsDate: "",
  });
  const [time, setTime] = useState(0);

  const handlefiltersValueChange = (e) => {
    console.log(e.target.value);
    setFilters((filters) => ({ ...filters, [e.target.name]: e.target.value }));
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
              name="location"
              value={location}
              onChange={handlefiltersValueChange}
            >
              {getOptions(locationOptions)}
            </select>
            <select
              name="area"
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
          <Heatmap {...{ location, area }} />
          <div className="occupancy-rate">
            <div className="occupancy-rate-header">
              <div>
                <h3 className="occupancy-rate-title">Occupancy Rate</h3>
                <p>
                  {location} - {area}
                </p>
              </div>
              <div>
                <select
                  name="frequency"
                  value={frequency}
                  onChange={handlefiltersValueChange}
                >
                  {getOptions(frequencyOptions)}
                </select>
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
              <CreateGraph selectedfrequency={frequency} selectedTime={time} />
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

const getOptions = (options) =>
  options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
