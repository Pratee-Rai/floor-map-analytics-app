import { useState } from "react";
import dayjs from 'dayjs';
import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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

  let currentDateTime = moment().format();
  let updatedCurrentDateTime = moment(currentDateTime).add(1, 'minute')

  const [customTimeData, setCustomTimeData] = useState([dayjs(currentDateTime), updatedCurrentDateTime])
  const [value, setValue] = useState('21:58:00-20:10:00');

  const timeOptions = [
    { label: '21:58:00-20:10:00', value: '21:58:00-20:10:00' },
    { label: 'Custom', value: 'Custom' },
  ];

  const handlefiltersValueChange = (e) => {
    console.log(e.target.value);
    setFilters((filters) => ({ ...filters, [e.target.name]: e.target.value }));
  };

  const handleChange = (e) => {

    const valReceived = e.target.value;
    setValue(valReceived);
    timeOptions.push({ label: valReceived, value: valReceived });

  }

  return (
    <Box sx={{ flexGrow: 1 }}>

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
                {value !== 'Custom' ?
                    <select value={value} onChange={handleChange}>
                      {timeOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  :
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={['SingleInputTimeRangeField']}
                    >
                      <SingleInputTimeRangeField
                        label="Time Selector"
                        value={customTimeData}
                        onChange={(newVal) => setCustomTimeData(newVal)}
                        size='small'
                        sx={{ lineHeight: '20px', padding: '0', width: 200 }}

                      />
                    </DemoContainer>

                  </LocalizationProvider>
                }
              </div>

              {/* {value !== 'Custom' ?
                <select value={value} onChange={handleChange}>
                  {timeOptions.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select> :
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={['SingleInputTimeRangeField']}
                >
                  <SingleInputTimeRangeField 
                  label="Time Selector" 
                  value={customTimeData}
                  onChange={(newVal) => setCustomTimeData(newVal)}
                  size='small'
                  sx={{ lineHeight: '20px', padding: '0', width: 200}}
                  
                  />
                </DemoContainer>

              </LocalizationProvider>
              } */}

            </div>
            <>
              <CreateGraph selectedfrequency={frequency} selectedTime={time} />
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
