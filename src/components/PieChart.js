import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const PieDisplay = ({data}) => {

    // Convert the object to an array suitable for Recharts
    const dataArray = Object.entries(data).map(([name, value]) => ({
        name,
        value
    }));

    const colors = COLORS.slice(0, data.length)

    return (
        <PieChart width={300} height={300}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataArray}
                cx={150}
                cy={150}
                outerRadius={80}
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
