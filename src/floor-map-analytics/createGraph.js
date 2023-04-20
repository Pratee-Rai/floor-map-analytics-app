import { useEffect, useState, useCallback } from "react";
import Papa from "papaparse";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import file1 from "../data/BayArea1/output.csv";
import file2 from "../data/BayArea2/output.csv";
import file3 from "../data/Cafeteria/output.csv";

const CreateGraph = ({ selectedfrequency, selectedTime, location, area }) => {
  const file =
    area === "Bay Area 1" ? file1 : area === "Bay Area 2" ? file2 : file3;

  const [data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [avgCount, setAvgCount] = useState(0);
  const [maxCount, setMaxCount] = useState(0);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(file);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      Papa.parse(csv, {
        delimiter: ",",
        newline: "",
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (input) {
          const records = input.data;
          setData(records);
        },
      });
    }
    getData();
  }, [file]);

  const handleUpdateMaxAVg = useCallback((d) => {
    let total = 0;
    if (d?.length > 0) {
      total = d
        .map(function (a) {
          return a.employees;
        })
        .reduce(function (a, b) {
          return a + b;
        });
      const avg = total / d?.length;
      const max = d
        .map(function (a) {
          return a.employees;
        })
        .reduce(function (prev, current) {
          return prev > current ? prev : current;
        });
      setTotalCount(total);
      setAvgCount(Math.round(avg));
      setMaxCount(max + 1);
    }
  }, []);

  useEffect(() => {
    if (data?.length !== 0 && data?.length !== undefined && totalCount === 0) {
      handleUpdateMaxAVg(data);
    }
  }, [data, totalCount, handleUpdateMaxAVg]);

  useEffect(() => {
    const timeDigit = parseInt(selectedfrequency.split(" ")[0]);

    if (timeDigit > 1) {
      const timeToMs = timeDigit * 60 * 1000;
      let result = [data[0]];
      for (let i = 0; i < data?.length; i++) {
        let prev = data[0];
        for (let j = 1; j < data?.length; j++) {
          let current = data[j];
          let [h1, m1] = prev.timespan.split(":");
          let [h2, m2] = current.timespan.split(":");
          let start = new Date(),
            end = new Date();

          start.setHours(h1);
          start.setMinutes(m1);
          end.setHours(h2);
          end.setMinutes(m2);
          let diff = end.getTime() - start.getTime();

          if (diff === timeToMs && result.indexOf(current) === -1) {
            result.push(current);
          }
        }
      }

      handleUpdateMaxAVg(result);
      setFormattedData(result);
      setDataCopy(result);
    } else if (timeDigit === 1) {
      setTotalCount(0);
      handleUpdateMaxAVg(data);
      setDataCopy([]);
    }
  }, [selectedfrequency, data, formattedData?.length, handleUpdateMaxAVg]);

  return (
    <>
      {location === "Hyderabad" ? (
        <AreaChart
          width={650}
          height={650 * 0.6}
          data={dataCopy.length > 1 ? dataCopy : data}
          margin={{
            top: 50,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timespan"
            stroke="#000000"
            fontSize="10"
            label={{
              value: "Time Stamp",
              position: "insideBottom",
              fontSize: 14,
            }}
          />
          <YAxis
            fontSize="10"
            axisLine={false}
            label={{ value: "Employee Count", angle: -90, fontSize: 14 }}
          />
          <Tooltip />
          <ReferenceLine
            y={maxCount}
            stroke="red"
            strokeDasharray="3 3"
            strokeWidth={2}
            label={{ value: "Max capacity", position: "top" }}
          />
          <ReferenceLine
            y={avgCount}
            stroke="blue"
            strokeWidth={3}
            label={{ value: "Average occupancy", position: "top" }}
          />
          {/* <Legend
                iconType="circle"
                layout="horizontal"
                align="right"
                verticalAlign="bottom"
            /> */}
          <Area type="monotone" dataKey="employees" fill="#6ca7f5" />
        </AreaChart>
      ) : (
        "No data available"
      )}
    </>
  );
};

export default CreateGraph;
