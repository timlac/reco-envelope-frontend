import React from 'react';
import { Typography, message } from 'antd';

const { Text } = Typography;

const CopyableText = ({ text }) => (
  <Text copyable={{
    text: text,
    onCopy: () => message.success('Text copied successfully!')
  }}>
    {text}
  </Text>
);

export default CopyableText;