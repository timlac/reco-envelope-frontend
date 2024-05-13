import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function BarDisplay({inputData}) {

    // Convert value occurrences to an array suitable for recharts
    const data = Object.entries(inputData).map(([value, count]) => ({
        name: `${value}`,
        count
    }));

    return (
        <div>
            <p></p>
            <p></p>
            <BarChart width={250} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#008080" />
            </BarChart>
        </div>
    );
}