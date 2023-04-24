import { useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
// import Grid from '@mui/material/Grid';
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
    analyticsDate: "2023-04-17",
  });
  const [time, setTime] = useState();

  let currentDateTime = moment().format();
  let updatedCurrentDateTime = moment(currentDateTime).add(1, "minute");

  const [customTimeData, setCustomTimeData] = useState([
    dayjs(currentDateTime),
    dayjs(updatedCurrentDateTime),
  ]);
  const [value, setValue] = useState("12:48:30-12:59:02");

  const timeOptions = [
    { label: "12:48:30-12:59:02", value: "12:48:30-12:59:02" },
    { label: "Custom", value: "Custom" },
  ];

  const handlefiltersValueChange = (e) => {
    setFilters((filters) => ({ ...filters, [e.target.name]: e.target.value }));
  };

  const handleChange = (e) => {
    const valReceived = e.target.value;
    setValue(valReceived);
  };

  const handleOnClose = () => {
    // timeOptions.push({ label: customTimeData, value: customTimeData });
    setTime(customTimeData);
    setValue(customTimeData);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="fma">
      <h1>Floor Map Analytics</h1>
      <div className="fma-content row justify-content-center">
        <div className="fma-content-header col-lg-12">
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
        <div className="fma-content-start row col-lg-12">
          <Heatmap {...{ location, area }} />
          <div className="occupancy-rate col-lg-5">
            <div className="occupancy-rate-header">
              <div>
                <h3 className="occupancy-rate-title">Occupancy Rate</h3>
                <p>
                  {location} - {area}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <select
                  name="frequency"
                  value={frequency}
                  onChange={handlefiltersValueChange}
                >
                  {getOptions(frequencyOptions)}
                </select>
                {value !== "Custom" ? (
                  <select value={value} onChange={handleChange}>
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{
                        p: 0,
                        ml: "5px",
                        "&>.MuiTextField-root": {
                          "&.MuiFormControl-root": {
                            minWidth: 150,
                          },
                        },
                      }}
                      components={["SingleInputTimeRangeField"]}
                    >
                      <SingleInputTimeRangeField
                        // label="Time Selector"
                        value={customTimeData}
                        onChange={(newVal) => setCustomTimeData(newVal)}
                        size="small"
                        sx={{
                          padding: 0,
                          width: 100,
                          height: 24,
                          overflow: "hidden",
                          minWidth: 100,
                          "& input": {
                            fontSize: 11,
                            height: 24,
                            padding: 0,
                            pl: "5px",
                          },
                          "& fieldset": {
                            border: "1px solid black",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                sx={{
                                  padding: 0,
                                  width: 24,
                                  height: 24,
                                  "& svg": {
                                    width: 20,
                                  },
                                }}
                                edge="end"
                                onClick={handleOnClose}
                              >
                                <CloseIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              </div>
            </div>
            <>
              <div className="row justify-content-center">
                <CreateGraph
                  selectedfrequency={frequency}
                  selectedTime={time}
                  area={area}
                  location={location}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </Box>
  );
}

const getOptions = (options) =>
  options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
