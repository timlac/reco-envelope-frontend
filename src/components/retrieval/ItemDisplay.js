import {Table} from "antd";

export const ItemDisplay = ({reversedListItems, highLightIndex}) => {

    const columns = [
        {
            title: 'Index',
            key: 'index',
            render: (text, record, index) => reversedListItems.length - index
        },
        {
            title: 'Retrieved At',
            dataIndex: 'retrieved_at',
            key: 'retrieved_at',
        },
        {
            title: 'Participant ID',
            dataIndex: 'participant_id',
            key: 'participant_id',
        },
        {
            title: 'Group',
            dataIndex: 'data',
            key: 'group',
            render: item => item.group

        },
    ];

    return (
        <Table
            dataSource={reversedListItems}
            columns={columns}
            rowClassName={(record, index) =>
                reversedListItems.length - index === highLightIndex ? 'new-row' : ''}/>
    )

}