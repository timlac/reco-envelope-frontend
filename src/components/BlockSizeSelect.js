import React, { useState } from 'react';
import { Form, Select, message } from 'antd';

export const BlockSizeSelect = () => {
    const [numbers, setNumbers] = useState([]);

    const handleSelect = (value) => {
        const parsed = parseFloat(value.trim());
        if (!isNaN(parsed)) {
            setNumbers(prev => [...prev, parsed]);
        } else {
            message.error(`${value} is not a valid number`);
        }
    };

    const handleDeselect = (value) => {
        setNumbers(prev => prev.filter(n => n !== parseFloat(value)));
    };


    return (
        <Form.Item
            name="block_size_list"
            rules={[{ required: true, message: 'This field is required' }]}
        >
            <Select
                mode="tags"
                style={{ width: '100%' }}
                tokenSeparators={[',']}
                placeholder="Enter numbers separated by commas"
                value={numbers.map(num => num.toString())}  // Control the component with string representations of numbers
                onSelect={handleSelect}
                onDeselect={handleDeselect}
            />
        </Form.Item>
    );
};
