import { useEffect, useState } from "react";
import Papa from 'papaparse';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    // Legend,
    ReferenceLine
} from "recharts";
import outputFile from '../data/output-minute.csv';

const CreateGraph = ({ selectedfrequency, selectedTime }) => {

    const [data, setData] = useState([]);
    const [dataCopy, setDataCopy] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [avgCount, setAvgCount] = useState(0);
    const [maxCount, setMaxCount] = useState(0);
    const [formattedData, setFormattedData] = useState();

    useEffect(() => {
        async function getData() {
            const response = await fetch(outputFile)
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
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
        getData()
    }, [])

    useEffect(() => {
        let total = 0;
        if ((data?.length !== 0 && data?.length !== undefined) && totalCount === 0 ) {
            // let dataTocheck = formattedData?.length !== 0 ? formattedData : data;
            total = data.map(function (a) { return a.people; })
                .reduce(function (a, b) { return a + b; });
            let avg = total / data?.length;
            const max = data.map(function (a) { return a.people; })
                .reduce(function (prev, current) {
                    return (prev > current) ? prev : current
                })
            setTotalCount(total);
            setAvgCount(Math.round(avg));
            setMaxCount(max + 1);
            }

    }, [data, totalCount])


    useEffect(() => {
        const timeDigit = selectedfrequency.split(" ")[0];
        if (timeDigit > 1) {
    
            const timeToMs = timeDigit * 60 * 1000;
            let result = [data[0]];
            for (let i = 0; i < data?.length; i++) {
                let prev = data[0];
                for (let j = 1; j < data?.length; j++) {
                    let current = data[j];
                    let [h1, m1] = prev.timespan.split(":");
                    let [h2, m2] = current.timespan.split(":");
                    let start = new Date(), end = new Date();

                    start.setHours(h1);
                    start.setMinutes(m1);
                    end.setHours(h2);
                    end.setMinutes(m2);
                    let diff = end.getTime() - start.getTime();

                    if (diff === timeToMs && result.indexOf(current) === -1) {
                        console.log(current)
                        result.push(current);
                    }
                }
            }

            setFormattedData(result);
            setTotalCount(0);
            setDataCopy(result);
        } else {
            console.log('here', timeDigit)
            setDataCopy(data);
        }

    }, [selectedfrequency, data, formattedData?.length])

    console.log(data)
    console.log(dataCopy)
    return (
        <>
            <AreaChart
                width={500}
                height={400}
                data={dataCopy.length > 1 ? dataCopy : data}
                margin={{
                    top: 50,
                    right: 20,
                    left: 0,
                    bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timespan" stroke="#000000" fontSize="10" label={{ value: "Time Stamp", position: 'insideBottom', fontSize: 14 }} />
                <YAxis fontSize="10" axisLine={false} label={{ value: "Employee Count", angle: -90, fontSize: 14 }} />
                <Tooltip />
                {/* <Legend /> */}
                <ReferenceLine y={maxCount} stroke="red" strokeDasharray="3 3" />
                <ReferenceLine y={avgCount} stroke="blue" strokeWidth={3} />
                <Area type="monotone" dataKey="people" fill="#6ca7f5" />
            </AreaChart>
        </>
    )
}

export default CreateGraph;