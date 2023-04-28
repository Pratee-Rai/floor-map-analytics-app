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
    ResponsiveContainer
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
    const [startRange, setStartRange] = useState();
    const [endRange, setEndRange] = useState();
    const [errorMsg, setErrMsg] = useState();

    const [intervalCount, setInternvalCount] = useState(0);

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

    const handleUpdateMaxAvg = useCallback((d) => {
        let total = 0;
        // let tempRange;
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
            handleUpdateMaxAvg(data);
        }
    }, [data, totalCount, handleUpdateMaxAvg]);

    useEffect(() => {
        let timeDigit = parseInt(selectedfrequency.split(" ")[0]);
        const timeUnit = selectedfrequency.split(" ")[1];

        if (timeUnit === "hrs") {
            timeDigit *= 60;
        }

        if (timeDigit > 1 && data?.length >= timeDigit)  {
            setErrMsg();
            setInternvalCount(timeDigit - 1);
            const lastRange = (Math.floor(data?.length / timeDigit)) * timeDigit;
            const tempData = data.filter((dt, index) => index <= lastRange);
            setStartRange(tempData[0]?.timespan);
            setEndRange(tempData[lastRange]?.timespan);
            setDataCopy(tempData);
            handleUpdateMaxAvg(tempData, lastRange);
        } else if (timeDigit === 1) {
            setErrMsg();
            setTotalCount(0);
            setInternvalCount(timeDigit - 1);
            setStartRange(data[0]?.timespan);
            setEndRange(data[(data?.length - 1)]?.timespan);
            handleUpdateMaxAvg(data);
            setDataCopy([]);
        } else{
            setErrMsg('Data not available for the selected frequency/place');
        }
    }, [selectedfrequency, data, handleUpdateMaxAvg]);


    return (
        <>
            {location === "Hyderabad" && errorMsg === undefined ? (
                <ResponsiveContainer height={400} width="100%">
                    <AreaChart
                        className="d-flex justify-content-center"
                        //   width={550}
                        //   height={550 * 0.6}
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
                            interval={intervalCount}
                            domain={[startRange, endRange]}
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
                </ResponsiveContainer>
            ) : (
                errorMsg
            )}
        </>
    );
};

export default CreateGraph;
