import { useEffect, useState } from "react";
import Papa from 'papaparse';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine
} from "recharts";
import outputFile from './output_sample.csv';

const CreateGraph = () => {

    const [data, setData] = useState([]);
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
                    setData(records)
                },
            });
        }
        getData()
    }, [])

    return (
        <>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 50,
                    right: 20,
                    left: 0,
                    bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time(half seconds)" stroke="#000000" fontSize="10" label={{ value: "Time Stamp", position: 'insideBottom', fontSize: 14 }} />
                <YAxis fontSize="10" axisLine={false} label={{ value: "Employee Count", angle: -90, fontSize: 14}} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={8} stroke="red" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="people" fill="#6ca7f5" />
            </AreaChart>
        </>
    )
}

export default CreateGraph;