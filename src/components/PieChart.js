import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import chroma from 'chroma-js';

// const data = [
//     {name: 'Group A', value: 400},
//     {name: 'Group B', value: 300},
//     {name: 'Group C', value: 300},
//     {name: 'Group D', value: 200},
// ];


const PieDisplay = ({data}) => {

    console.log(data)

    // Convert the object to an array suitable for Recharts
    const dataArray = Object.entries(data).map(([name, value]) => ({
        name,
        value
    }));

    console.log(dataArray)

    const colors = chroma.scale(['#6a1b9a', '#ffeb3b']).mode('lch').colors(dataArray.length);

    return (
        <PieChart width={400} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataArray}
                cx={200}
                cy={200}
                outerRadius={100}
                fill="#8884d8"
                label
            >
                {dataArray.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                ))}
            </Pie>
            <Tooltip/>
            <Legend/>
        </PieChart>
    );
}
export default PieDisplay;
